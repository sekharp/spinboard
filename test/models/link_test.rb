require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  valid_params = {title: "A Link",
                  url: "http://www.nytimes.com",
                  read: false}

  test "link is valid with correct params" do
    link = Link.new(valid_params)
    assert link.valid?
  end

  test "link is not valid with incorrect params" do
    bad_link = Link.new({title: "A Bad Link",
                         url: "$$$$$$$$",
                         read: false})
    refute bad_link.valid?
  end
end
