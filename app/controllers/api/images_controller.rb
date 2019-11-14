class Api::ImagesController < ApplicationController
  def index
    @images = Image.all
    render :index
  end

  private
  def image_params
    params.requie(:image).permit(:author_id, :caption)
  end
end