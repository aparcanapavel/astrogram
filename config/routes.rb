Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :new, :show, :index] do
      resources :follows, only: [:create, :destroy, :index]
    end
    resource :session, only: [:new, :create, :destroy]
    resources :comments, only: [:create, :destroy, :show]
    resources :likes, only: [:create, :destroy, :show]
    resources :images, only: [:create, :index, :show, :destroy] do
      resources :comments, only: [:index]
      resources :likes, only: [:index]
    end
  end
end
