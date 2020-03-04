class SpinsController < ActionController::API

    def popular
        result = Spin.all.spin_count 
        sorted = result.sort{|spin| -spin.count}
        sorted = sorted[1..9]

        render json: result
    end


    def recent
        result = Spin.all.sort{|spin| spin.created_at}
        result = result[1..9]

        render json: result
    end

end
