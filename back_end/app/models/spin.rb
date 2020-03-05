class Spin < ActiveRecord::Base

    # def count
    #     count = 0
    #     Spin.all.each{ |spin|
    #         if spin.yelp_id == self.yelp_id
    #             count += 1
    #         end
    #     }
    #     return count 
    # end

    def self.spin_count
        restaurants = []
        
        uniqueRestuarants = Spin.all.uniq{|restaurant| restaurant['yelp_id']}
        
        uniqueRestuarants.each{ |spin|
            hash = {}
            hash[:name] = spin.name
            hash[:id] = spin['yelp_id']
            hash[:url] = spin.url


            spun = Spin.all.count{ |spin|
                        spin['yelp_id'] === hash[:id]
                    }
                    
            hash[:spun] = spun
            
            restaurants << hash
        }

        return restaurants

    end

end