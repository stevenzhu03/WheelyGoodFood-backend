class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      t.integer :yelp_id
      t.integer :trip_count
    end
  end
end
