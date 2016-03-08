require 'simplecov'
SimpleCov.start
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
end

class ActionController::TestCase

  def json_response
    JSON.parse(response.body)
  end

end

class ActionDispatch::IntegrationTest
  # Make the Capybara DSL available in all integration tests
  def teardown
    reset_session!
  end

  include Capybara::DSL
end
