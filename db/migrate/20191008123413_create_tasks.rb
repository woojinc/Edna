class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :description
      t.boolean :completed, default: false
      t.datetime  :start_date
      t.datetime  :end_date
      t.datetime  :due_date
      t.integer :assignee_id
      t.integer :author_id, null: false
      t.integer :section_id
      t.integer :prev_task_id
      t.integer :next_task_id

      t.timestamps
    end
    add_index :tasks, :author_id
  end
end
