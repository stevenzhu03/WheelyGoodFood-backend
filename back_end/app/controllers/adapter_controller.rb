class AdapterController < ActionController::API

    def yelp
        location = params[:location]
        type = params[:type]
        results = Adapter.search(type, location)

        render json: results
    end

    

end
