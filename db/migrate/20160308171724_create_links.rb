class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :title
      t.string :url
      t.belongs_to :user, index: true
      t.belongs_to :list, index: true
      t.boolean :read, default: false

      t.timestamps null: false
    end
  end
end
