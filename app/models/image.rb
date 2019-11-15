class Image < ApplicationRecord

  belongs_to :author, 
    foreign_key: :author_id, 
    class_name: :User
    
  has_one_attached :photo

  # validates :ensure_photo

  def ensure_photo
    unless self.photo.attached?
      errors[:image] << "Must have an image"
    end
  end
  
end
