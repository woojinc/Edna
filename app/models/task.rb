# == Schema Information
#
# Table name: tasks
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  description  :text
#  completed    :boolean          default(FALSE)
#  start_date   :datetime
#  end_date     :datetime
#  due_date     :datetime
#  assignee_id  :integer
#  author_id    :integer          not null
#  section_id   :integer
#  prev_task_id :integer
#  next_task_id :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Task < ApplicationRecord
    validates :name, :author_id, presence: true

    belongs_to :section
    belongs_to :author,
        class_name: 'User'    
    belongs_to :assignee, optional: :true,
        class_name: 'User'    

    def self.ordered_list(task)
        @tasks = task.section.tasks
        
        task_hash = {}
        head = nil

        @tasks.each do |task|
            task_hash[task.id] = task 
            head = task if task.prev_task_id == nil
        end
        
        ordered_list = [head]

        until ordered_list.last.next_task_id == nil do
            ordered_list.push(task_hash[ordered_list.last.next_task_id])
        end
    
        ordered_list
    end

    def self.ordered_list_ids(task)
        @tasks = task.section.tasks
        task_hash = {}
        head = nil

        @tasks.each do |task|
            task_hash[task.id] = task 
            head = task if task.prev_task_id == nil
        end
        
        ordered_list_ids = [head.id]

        until task_hash[ordered_list_ids.last].next_task_id == nil do
            ordered_list_ids.push(task_hash[ordered_list_ids.last].next_task_id)
        end

        
        ordered_list_ids
    end
end
