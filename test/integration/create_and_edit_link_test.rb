require 'test_helper'

class CreateLinkTest < ActionDispatch::IntegrationTest
  test 'authenticated user can create a link' do
    visit root_path

    click_link "Sign Up"

    fill_in "Email", with: "mikedao@gmail.com"
    fill_in "Password", with: "tswift"
    fill_in "Password confirmation", with: "tswift"
    click_button "Create Account"

    assert_equal links_path, current_path

    fill_in 'link_title', with: 'Taylor Swift Fan Club'
    fill_in 'link_url', with: 'http://www.taylorswift.com'
    click_button 'Create Link'

    assert page.has_content?('Taylor Swift Fan Club')
    assert page.has_content?('http://www.taylorswift.com')
  end

  test 'authenticated user can create a link then edit it' do
    visit root_path

    click_link "Sign Up"

    fill_in "Email", with: "mikedao@gmail.com"
    fill_in "Password", with: "tswift"
    fill_in "Password confirmation", with: "tswift"
    click_button "Create Account"

    assert_equal links_path, current_path

    fill_in 'link_title', with: 'Taylor Swift Fan Forums'
    fill_in 'link_url', with: 'http://www.taylorswiftforums.com'
    click_button 'Create Link'

    assert page.has_content?('Taylor Swift Fan Forums')
    assert page.has_content?('http://www.taylorswiftforums.com')

    click_link 'Edit Link'

    fill_in 'link_title', with: 'Beyonce'
    fill_in 'link_url', with: 'http://www.putaringonit.com'
    click_button 'Edit Link'

    assert page.has_content?('Beyonce')
    assert page.has_content?('http://www.putaringonit.com')
  end

  test 'authenticated user can create a link but cannot edit it to invalid url' do
    visit root_path

    click_link "Sign Up"

    fill_in "Email", with: "mikedao@gmail.com"
    fill_in "Password", with: "tswift"
    fill_in "Password confirmation", with: "tswift"
    click_button "Create Account"

    assert_equal links_path, current_path

    fill_in 'link_title', with: 'Taylor Swift Fan Forums'
    fill_in 'link_url', with: 'http://www.taylorswiftforums.com'
    click_button 'Create Link'

    assert page.has_content?('Taylor Swift Fan Forums')
    assert page.has_content?('http://www.taylorswiftforums.com')

    click_link 'Edit Link'

    fill_in 'link_title', with: 'Beyonce'
    fill_in 'link_url', with: '$3kH@R'
    click_button 'Edit Link'

    assert page.has_content?('Edit a Link')
  end

  test 'authenticated user cannot create a link with an invalid url' do
    visit root_path

    click_link "Sign Up"

    fill_in "Email", with: "mikedao@gmail.com"
    fill_in "Password", with: "tswift"
    fill_in "Password confirmation", with: "tswift"
    click_button "Create Account"

    assert_equal links_path, current_path

    fill_in 'link_title', with: 'I Love Jack Yeh'
    fill_in 'link_url', with: '$$$JACK<3%%%'
    click_button 'Create Link'

    assert page.has_content?('Url is invalid')
  end

  test 'unauthenticated user cannot visit link index page without redirect to login page' do
    visit links_path

    assert login_path, current_path
  end
end
