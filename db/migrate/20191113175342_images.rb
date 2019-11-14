class Images < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.integer :author_id, null: false, index: true
      t.string :image_url, null: false
      t.text :caption

      t.timestamps
    end
  end
end
