class CreateSections < ActiveRecord::Migration[5.2]
  def change
    create_table :sections do |t|
      t.string :name, null: false
      t.text :description
      t.boolean :null_section, default: false
      t.integer :project_id, null: false
      t.integer :prev_section_id
      t.integer :next_section_id

      t.timestamps
    end
    add_index :sections, :project_id
  end
end
