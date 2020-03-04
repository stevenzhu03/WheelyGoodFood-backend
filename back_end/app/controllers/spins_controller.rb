class SpinsController < ActionController::API

    def popular
        result = Spin.spin_count 
        sorted = result.sort{|spin| spin.count}
        sorted = sorted[0...5]
        render json: sorted
    end


    def recent
        result = Spin.all.sort{|spin| -spin.id}
        result = result[0...5]

        render json: result
    end

end
