export const fetchImages = (userId) => {

  return $.ajax({
    method: 'GET',
    url: '/api/images',
    data: { userId }
  })
}

export const createImage = image => {
  debugger
  return $.ajax({
    method: 'POST',
    url: '/api/images',
    data: image,
    contentType: false, //makes sure it doesnt get formatted by rails
    processData: false
  })
}

export const deleteImage = imageId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/images/${imageId}`
  })
}

export const fetchAuthor = userId => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  })
}

export const fetchImage = imageId => {
  return $.ajax({
    method: "GET",
    url: `/api/images/${imageId}`
  })
}