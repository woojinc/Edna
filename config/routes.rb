Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "static_pages#root"
  namespace :api, default: {format: :json} do
    resource :user, except: [:index, :new, :edit]
    resource :session, only: [:create, :destroy]
    resources :projects, except: [:new, :edit] do
      resources :sections, only: [:create, :index] do
        member do
          patch 'update_sections_order'
        end
        resources :tasks, only: [:create, :index] do
          member do
            patch 'update_tasks_order'
          end
        end
      end
    end
    resources :sections, only: [:show, :update, :destroy]
    resources :tasks, only: [:show, :update, :destroy]
  end
end
