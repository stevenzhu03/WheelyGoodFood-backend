class SpinsController < ActionController::API

    def most
        result = Spin.all.spin_count 
        render json: result
    end


    def recent
        result = Spin.all.sort{|spin| spin.created_at}
        render json: result
    end

end
