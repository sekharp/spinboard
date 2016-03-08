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
  end

  test 'unauthenticated user cannot visit link index page without redirect to login page' do
    visit links_path

    assert login_path, current_path
  end
end
