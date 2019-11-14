export const fetchImages = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/images'
  })
}

export const createImage = image => {
  return $.ajax({
    method: 'POST',
    url: '/api/images',
    data: image,
    contentType: false, //makes sure it doesnt get formatted by rails
    processData: false
  })
}