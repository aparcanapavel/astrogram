class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :author_id, null: false, index: true
      t.integer :image_id, null: false, index: true

      t.timestamps
    end
  end
end
