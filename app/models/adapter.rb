require "json"
require "http"
require "optparse"

class Adapter

 API_KEY = ENV['yelp_key']  
    
 # Constants, do not change these
 API_HOST = "https://api.yelp.com"
 SEARCH_PATH = "/v3/businesses/search"
 BUSINESS_PATH = "/v3/businesses/"  # trailing / because we append the business id to the path
 SEARCH_LIMIT = 8

    def self.search(term, location, price)
     url = "#{API_HOST}#{SEARCH_PATH}"

    #default to restaurant if no term is entered
    if term == ""
      term = "restaurant"
    end

    #default to new york if no location is entered
    if location == ""
      location = "New York"
    end

    #default to all prices if any price is entered
    if price == "0" 
      price = "1,2,3,4"
    end

    
     params = {
       term: term,
       location: location,
       limit: SEARCH_LIMIT,
       price: price
     }
     response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
     response.parse["businesses"]

  
    end

    def self.business_reviews(business_id)
    url = "#{API_HOST}#{BUSINESS_PATH}#{business_id}/reviews"
    response = HTTP.auth("Bearer #{API_KEY}").get(url)
    response.parse["reviews"]
    end
    
    def self.business(business_id)
    url = "#{API_HOST}#{BUSINESS_PATH}#{business_id}"
    response = HTTP.auth("Bearer #{API_KEY}").get(url)
    response.parse
    end
    

end

