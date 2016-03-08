require 'test_helper'

class UserTest < ActiveSupport::TestCase
  valid_params = {email: "sekharp@gmail.com",
                  password: "asdf",
                  password_confirmation: "asdf"}

  test "it is valid with correct params" do
    user = User.new(valid_params)

    assert user.valid?
  end

  test "it is invalid when password and password confirmation do not match" do
    bad_user = User.new({email: "sekharp@gmail.com",
                         password: "asdf",
                         password_confirmation: "1234"})

    refute bad_user.valid?
  end

  test "password must be present upon creation" do
    another_bad_user = User.new({email: "sekharp@gmail.com"})

    refute another_bad_user.valid?
  end

  test "email must be unique in order for new user to be created" do
    first_user = User.new(valid_params)
    same_params_user = User.new(valid_params)

    assert 1, User.all
  end
end
