class Api::FollowsController < ApplicationController
  # before_action :require_logged_in

  def create
    @follow = Follow.new(follow_params)

    # @follow.follower_id = current_user.id
    @follow.save
    render :show
  end

  def destroy
    # @follow = current_user.out_follows.find_by(followee_id: params[:user_id])
    @follow = Follow.find_by(followee_id: params[:user_id])
    # debugger
    # @follow.destroy if @follow.follower_id == current_user.id
    @follow.destroy
  end

  def index
    @followers = Follow.all
  end

  private
  def follow_params
    params.require(:follow).permit(:followee_id, :follower_id)
  end
end