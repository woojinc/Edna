class ChangePronounsColumnNullTrue < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :pronouns, :string, :null => true
  end
end
