Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/yelp', to: 'adapter#yelp'
  post '/maps', to: 'adapter#maps'
  post 'visits', to: 'restuarant#visits' 

end
