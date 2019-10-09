# == Schema Information
#
# Table name: projects
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  description    :string
#  public_project :boolean          default(TRUE)
#  workspace_id   :integer
#  author_id      :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Project < ApplicationRecord
    validates :title, presence: true

    belongs_to :author,
        class_name: 'User'

    has_many :sections, dependent: :destroy

    has_many :tasks, dependent: :destroy,
        through: :sections,
        source: :tasks
    
end
