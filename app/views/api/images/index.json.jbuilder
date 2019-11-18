json.set! :images do
  @images.each do |image|
    json.set! image.id do 
      json.extract! image, :id, :author_id, :comment_ids
      json.imageUrl url_for(image.photo)

      if image.caption
        json.caption image.caption
      else
        json.caption ""
      end

    end
  end
end

json.set! :comments do
  @images.each do |image|
    image.comments.each do |comment|
      json.set! comment.id do 
        json.extract! comment, :id, :author_id, :image_id, :body
      end
    end
  end
end