class SpinsController < ActionController::API

    def popular
        result = Spin.all.spin_count 
        sorted = result.sort{|spin| -spin.count}
        sorted = sorted[0...5]

        render json: sorted
    end


    def recent
        result = Spin.all.sort{|spin| spin.created_at}
        result = result[0...5]

        render json: result
    end

end
