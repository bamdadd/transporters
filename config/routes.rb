Transporters::Application.routes.draw do
  get "stops/index"
  get "stops/find/:lat/:long", :controller => :stops, :action => :find, :constraints  => { :lat => /[0-9\.-]+/, :long => /[0-9\.-]+/ }
  get "stops/find/:name", :controller => :stops, :action => :by_name
  get "stops/:code", :controller => :stops, :action => :show
  get "routes/index"
  get "routes/find/:name", :controller => :routes, :action => :by_name
  get "routes/filter/:name", :controller => :routes, :action => :filter
  get "routes/show/:name", :controller => :routes, :action => :show
  get "stoptime/:stop_code", :controller => :StopTime, :action=> :by_stop_code
  get "routes/search/:lat1/:long1/:lat2/:long2", :controller => :routes, :action => :search, :constraints  => { :lat1 => /[0-9\.-]+/, :long1 => /[0-9\.-]+/, :lat2 => /[0-9\.-]+/, :long2 => /[0-9\.-]+/ }

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'homes#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id))(.:format)'
end
