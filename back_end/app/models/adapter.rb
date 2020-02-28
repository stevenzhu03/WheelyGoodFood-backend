require "json"
require "http"
require "optparse"

class Adapter

 # API_KEY = ENV['yelp_api_key']
 API_KEY ="6SkpxfmOou1-J6vUmaqqFPT4wtmjGiK1lsue9ZkqUCLqrv6-9k5Hxfhu1yTifwiRoXmF3QZVISyCmBaF0cW4IizoiRzmiBWb_yzkJVFmincW5Csi5YqlYBqx3zQnXnYx"    
    
 # Constants, do not change these
 API_HOST = "https://api.yelp.com"
 SEARCH_PATH = "/v3/businesses/search"
 BUSINESS_PATH = "/v3/businesses/"  # trailing / because we append the business id to the path
 SEARCH_LIMIT = 15

    def self.search(term, location="new york")
     url = "#{API_HOST}#{SEARCH_PATH}"
     params = {
       term: term,
       location: location,
       limit: SEARCH_LIMIT
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

