class Follow < ApplicationRecord
  validates :follower, uniqueness: { scope: :followee}

  belongs_to :followee, 
    foreign_key: :followee_id, 
    class_name: :User

  belongs_to :follower, 
    foreign_key: :follower_id, 
    class_name: :User
end