class Api::FollowsController < ApplicationController
  # before_action :require_logged_in

  def create
    @follow = Follow.new(follow_params)
    @follow.follower_id = current_user.id
    @follow.save
    render :show
  end

  def destroy
    @follow = Follow.find_by(followee_id: params[:id])
    @follow.destroy
    render :show
  end

  def index
    @followers = Follow.all
  end

  private
  def follow_params
    params.require(:follow).permit(:followee_id)
  end
end