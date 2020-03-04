class AddUrlColumnToSpins < ActiveRecord::Migration[6.0]
  def change
    add_column :spins, :url, :string
  end
end
