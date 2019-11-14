class Api::ImagesController < ApplicationController
  def index
    @images = Image.all
    render :index
  end

  def show
    @image = Image.find_by(params[:id])
    render :show
  end

  def create
    @image = Image.new(image_params)
    @image.author_id = current_user.id
    if @image.save
      render :show
    else
      render json: ["Please attach an image"], status: 400
    end
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    render json: ["Please attach an image"], status: 400


  end

  private
  def image_params
    params.require(:image).permit(:caption, :photo)
  end
end