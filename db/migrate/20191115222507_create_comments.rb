class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false, index: true
      t.integer :image_id, null: false, index: true
      t.text :body, null: false
      t.integer :parent_comment_id, index: true

      t.timestamps
    end
  end
end
