class Link < ActiveRecord::Base
  belongs_to :user
  default_scope { order("created_at") }
  validates :url, :format => URI::regexp(%w(http https))
end
