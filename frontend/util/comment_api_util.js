export const fetchComments = imageId => {
  return $.ajax({
    method: 'GET',
    url: `/api/images/${imageId}/comments`
  })
}

export const createComment = comment => {
  return $.ajax({
    method: 'POST',
    url: `/api/comments`,
    data: { comment }
  })
}

export const fetchComment = commentId => {
  return $.ajax({
    method: 'GET',
    url: `/api/comments/${commentId}`
  })
}

export const deleteComment = commentId => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/comments/${commentId}`
  })
}