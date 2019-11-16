class Comment < ApplicationRecord
  validates :body, presence: true
  
  belongs_to :author, 
    foreign_key: :author_id, 
    class_name: :User

  belongs_to :image, 
    foreign_key: :image_id, 
    class_name: :Image
end