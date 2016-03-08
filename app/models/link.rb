class Link < ActiveRecord::Base
  belongs_to :user
  belongs_to :list
  default_scope { order("created_at") }
  validates :url, :format => URI::regexp(%w(http https))
end
