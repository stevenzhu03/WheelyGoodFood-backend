class AdapterController < ActionController::API

    def yelp
        location = params[:location]
        type = params[:type]
        price = params[:price]
        results = Adapter.search(type, location, price)

        if results
            render json: results
        else 
            render json: {errors: "No Restuarants Found"}
        end


    end

    def yelpBusiness
        id = params[:id]
        results = Adapter.business(id)
        reviews = Adapter.business_reviews(id)
        Spin.create({yelp_id: results["id"], name: results["name"], url: results["url"]})
        
        response = {
            business_info: results,
            reviews: reviews
        }
        
        
        render json: response
    end




end
