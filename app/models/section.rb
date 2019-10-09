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

    def self.orderedList(section)
        @sections = section.project.sections
        section_hash = {}

        @sections.each do |section|
            section_hash[section.id] = section 
        end
        
        orderedList = [section_hash[section_hash.keys.sort.first]]

        until orderedList.last.next_section_id == nil do
            orderedList.push(section_hash[orderedList.last.next_section_id])
        end

        orderedList
    end

end
