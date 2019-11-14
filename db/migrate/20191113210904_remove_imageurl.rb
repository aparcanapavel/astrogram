class RemoveImageurl < ActiveRecord::Migration[5.2]
  def change
    remove_column :images, :image_url
  end
end
