class Api::FollowsController < ApplicationController
  # before_action :require_logged_in

  def create

    @follow = Follow.new(follow_params)
    @follow.follower_id = current_user.id
    @follow.save
    render :show
  end

  def destroy
    # debugger
    @follow = Follow.find_by(
      followee_id: params[:id],
      follower_id: current_user.id 
    )
    if @follow
      @follow.destroy
      render :show
    else
      render json: ["not following user"], status: 404
    end
  end

  def index
    @followers = Follow.all
  end

  private
  def follow_params
    params.require(:follow).permit(:followee_id)
  end
end