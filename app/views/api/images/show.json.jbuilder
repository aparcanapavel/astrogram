json.image do
  json.extract! @image, :id, :author_id, :comment_ids
  json.imageUrl url_for(@image.photo)

  if @image.caption
    json.caption @image.caption
  else
    json.caption ""
  end

  json.comments do
    image.comments.each do |comment|
      json.set! comment.id do
        json.extract! comment, :id, :author_id, :image_id, :body
      end
    end
  end

end
  # wrap under the key of image
  #send another key of comments. same for the index
  #comments reducer now accpets receiving images