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

    belongs_to :user,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: 'User';
    
end
