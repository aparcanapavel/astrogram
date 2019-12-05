class User < ApplicationRecord
  validates :username, :full_name, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, allow_nil: true, length: { minimum:5 }

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :authored_images,
    foreign_key: :author_id,
    class_name: :Image,
    dependent: :destroy

  has_many :authored_comments, 
    foreign_key: :author_id, 
    class_name: :Comment,
    dependent: :destroy

  has_many :authored_likes, 
    foreign_key: :author_id, 
    class_name: :Like,
    dependent: :destroy

  has_many :in_follows, 
    foreign_key: :followee_id, 
    class_name: :Follow
  
  has_many :out_follows, 
    foreign_key: :follower_id, 
    class_name: :Follow

  has_many :followers, 
    through: :in_follows, 
    source: :follower

  has_many :followees, 
    through: :out_follows, 
    source: :followee
  
  has_one_attached :photo

  # SSPIRE
  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def followed_user_ids
    @followed_user_ids ||= out_follows.pluck(:followee_id)
  end
  
  def follows?(user)
    followed_user_ids.include?(user.id)
  end

end
