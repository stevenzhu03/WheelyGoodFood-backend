class AdapterController < ActionController::API

    def yelp
        location = params[:location]
        type = params[:type]
        results = Adapter.search(type, location)

        render json: results
    end

    def yelpBusiness
        id = params[:id]
        results = Adapter.business(id)
        reviews = Adapter.business_reviews(id)

        
        response = {
            business_info: results,
            reviews: reviews
        }
        
        
        render json: response
    end




end
