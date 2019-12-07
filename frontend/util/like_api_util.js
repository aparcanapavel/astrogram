export const fetchLikes = imageId => {
  
  return $.ajax({
    method: 'GET',
    url: `/api/images/${imageId}/likes`
  })
}

export const createLike = like => {
  return $.ajax({
    method: 'POST',
    url: '/api/likes',
    data: { like }
  })
}

export const fetchLike = likeId => {
  return $.ajax({
    method: 'GET',
    url: `/api/likes/${likeId}`
  })
}

export const deleteLike = likeId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/likes/${likeId}`
  })
}