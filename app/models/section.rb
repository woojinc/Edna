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

    def self.ordered_list(section)
        @sections = section.project.sections
        
        section_hash = {}
        head = nil

        @sections.each do |section|
            section_hash[section.id] = section 
            head = section if section.prev_section_id == nil
        end
        
        ordered_list = [head]

        until ordered_list.last.next_section_id == nil do
            ordered_list.push(section_hash[ordered_list.last.next_section_id])
        end
    
        ordered_list
    end

    def self.ordered_list_ids(section)
        @sections = section.project.sections
        section_hash = {}
        head = nil

        @sections.each do |section|
            section_hash[section.id] = section 
            head = section if section.prev_section_id == nil
        end
        
        ordered_list_ids = [head.id]

        until section_hash[ordered_list_ids.last].next_section_id == nil do
            ordered_list_ids.push(section_hash[ordered_list_ids.last].next_section_id)
        end

        
        ordered_list_ids
    end

end
