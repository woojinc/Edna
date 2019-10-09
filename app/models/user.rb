# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  last_name       :string
#  first_name      :string
#  pronouns        :string
#  role            :string
#  team            :string
#  password_digest :string           not null
#  session_token   :string           not null
#

class User < ApplicationRecord

  attr_reader :password

  validates :password_digest, presence: true
  validates :email, :session_token, presence:true, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token

  has_many :projects,
      foreign_key: :author_id
  has_many :authored_sections,
      foreign_key: :author_id
  has_many :authored_tasks,
      foreign_key: :author_id
  has_many :assigned_tasks,
      foreign_key: :assignee_id

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    return nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

end
