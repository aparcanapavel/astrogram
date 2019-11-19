class Api::LikesController < ApplicationController
  before_action :require_logged_in, only: [:create, :destroy];
  
  def index
    @likes = Like.where(image_id: params[:image_id])
    render :index
  end

  def create
    @like = Like.new(like_params)
    @like.author_id = current_user.id

    if @like.save
      render :show
    else
      render json: ["You must be logged in"], status: 400
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy
  end

  def show
    @like = Like.find(params[:id])
    render :show
  end


  private
  def like_params
    params.require(:like).permit(:image_id)
  end

end