# == Schema Information
#
# Table name: sections
#
#  id              :bigint           not null, primary key
#  name            :string           not null
#  description     :text
#  null_section    :boolean          default(FALSE)
#  project_id      :integer          not null
#  prev_section_id :integer
#  next_section_id :integer
#  author_id       :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Section < ApplicationRecord
    validates :name, :project_id, presence: true

    belongs_to :project
    
    belongs_to :author,
        class_name: 'User'

    has_many :tasks


end
