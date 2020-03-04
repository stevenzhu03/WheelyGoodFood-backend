Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/yelp', to: 'adapter#yelp'
  post '/yelp/business', to: 'adapter#yelpBusiness'
  get '/spins/most', to: 'spins#most'
  get '/spins/recent', to: 'spins#recent'
  # post '/maps', to: 'adapters#maps'
  # post 'visits', to: 'restuarant#visits' 

end
