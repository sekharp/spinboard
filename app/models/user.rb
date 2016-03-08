class User < ActiveRecord::Base
  has_secure_password

  validates :email, presence: true,
                       uniqueness: true

  validates :password, presence: true,
                       confirmation: true

  validates :password_confirmation, presence: true
end
