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
    file = File.open('https://astrogram-seeds.s3.amazonaws.com/night-sky-with-moon-and-stars.jpg');
    @user.profile_picture.attach(io: file, filename: 'night-sky-with-moon-and-stars.jpg')

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

  def edit
    @user = User.find(current_user.id)
    render :show
  end

  def update
    @user = current_user

    if @user.update(user_params)
      render :show
    else
      render json: ['You must update your image'], status: 401
    end
rescue ActiveSupport::MessageVerifier::InvalidSignature
    render json: ['You must update your image'], status: 400
  end

  private
  def user_params
    params.require(:user).permit(:username, :full_name, :password, :profile_picture)
  end
end
