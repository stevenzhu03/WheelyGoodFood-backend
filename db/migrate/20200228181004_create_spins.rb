class CreateSpins < ActiveRecord::Migration[6.0]
  def change
    create_table :spins do |t|
      t.string :yelp_id
      t.string :name

      t.timestamps
    end
  end
end
