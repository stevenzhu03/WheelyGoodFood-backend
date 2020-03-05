class SpinsController < ActionController::API

    def popular
        result = Spin.spin_count
        sorted = result.sort_by{|spin| -spin[:spun]}
        sorted = sorted[0...5]
        render json: sorted
    end


    def recent
        result = Spin.all.sort{|spin| -spin.id}
        result = result[0...5]

        render json: result
    end

end
