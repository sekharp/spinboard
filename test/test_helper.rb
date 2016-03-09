require 'simplecov'
SimpleCov.start
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'capybara/rails'

class ActiveSupport::TestCase
end

class ActionController::TestCase

  def json_response
    JSON.parse(response.body)
  end

end

class ActionDispatch::IntegrationTest
  def teardown
    reset_session!
  end

  include Capybara::DSL
end
