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
    belongs_to :assignee,
        class_name: 'User'    
end
