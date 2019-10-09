class AddAuthorIdToSections < ActiveRecord::Migration[5.2]
  def change
    remove_column :sections, :created_at, :datetime
    remove_column :sections, :updated_at, :datetime
    add_column :sections, :author_id, :integer
    add_timestamps :sections
  end
end
