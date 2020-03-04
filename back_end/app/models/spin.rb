class Spin < ActiveRecord::Base
    

    def count
        count = 0
        Spin.all.each{ |spin|
            if spin.yelp_id == self.yelp_id
                count += 1
            end
        }
        return count 
    end

    def self.spin_count
        hash = {}
        Spin.all.each{|spin|
            if hash.key?(spin.yelp_id)
                hash[spin.yelp_id] += 1
            else
                hash[spin.yelp_id] = 1
            end
        }
        return hash
    end

end