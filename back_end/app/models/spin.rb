class Spin < ActiveRecord::Base


    def self.spin_count
        restaurants = []
        
        uniqueRestuarants = Spin.all.uniq{|restaurant| restaurant['yelp_id']}
        
        uniqueRestuarants.each{ |spin|
            hash = {}
            hash[:name] = spin.name
            hash[:id] = spin['yelp_id']
            hash[:url] = spin.url


            count = Spin.all.count{ |spin|
                        spin['yelp_id'] === hash[:id]
                    }
                    
            hash[:count] = count
            
            restaurants << hash
        }

        return restaurants

    end

end