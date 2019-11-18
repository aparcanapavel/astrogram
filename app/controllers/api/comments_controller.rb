class Api::CommentsController < ApplicationController
  before_action :require_logged_in, only: [:new, :create]

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    # @comment.image_id = params[:image_id]
    if @comment.save
      render :show
    else
      render json: ["Comment cannot be blank"], status: 400
    end
  end

  def destroy
    @comment = current_user.authored_comments.find(params[:id])
    @comment.destroy
    # redirect to image show page
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  def index
    @comments = Comment.where(image_id: params[:image_id])
    render :index
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :image_id)
  end
end