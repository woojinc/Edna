class ChangeUsersColumnsToNullTrue < ActiveRecord::Migration[5.2]
  def change
        change_column :users, :last_name, :string, :null => true
        change_column :users, :first_name, :string, :null => true
  end
end
