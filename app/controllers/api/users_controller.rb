class Api::UsersController < ApplicationController
  def new
    user = User.new
    render :new
  end

  def index
    @users = User.includes(:followers, :followees).all
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :full_name, :password)
  end
end
