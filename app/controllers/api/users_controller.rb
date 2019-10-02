class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422 #Unprocessable entities
        end
    end

    def edit
        @user = User.find(params[:id])
        if @user.update_attributes(user_params)
            render "api/users/show/"
        else
            render json: @user.errors.full_messages, status: 422 #Unprocessable entities
        end
    end

    def show
        @user = User.find(params[:id])
        render "api/users/show/"
    end

    def udpate
        @user = User.find(params[:id])
        if @user.update_attributes(user_params)
            render "api/users/show"
        else
            render json: @users.errors.full_messages, status: 422 #Unprocessable entities
        end
    end

    def destroy
    end

    private
    def user_params 
        params.require(:user).permit(
            :email, 
            :last_name, 
            :first_name, 
            :pronouns, 
            :role, 
            :team, 
            :password);
    end 
end
