json.set! @image.id do
  json.extract! @image, :id, :author_id
  json.imageUrl url_for(@image.photo)

  if @image.caption
    json.caption @image.caption
  else
    json.caption ""
  end
end
