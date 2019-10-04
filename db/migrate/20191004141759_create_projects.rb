class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :title, null:false
      t.string :description
      t.boolean :public_project, default: true
      t.integer :workspace_id
      t.integer :author_id
      t.timestamps
    end
    add_index :projects, :workspace_id
    add_index :projects, :author_id
  end
end
