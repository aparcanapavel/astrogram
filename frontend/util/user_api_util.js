export const fetchUsers = (username) => {
  return $.ajax({
    method: 'get',
    url: '/api/users',
    data: { username }
  })
}

export const fetchUser = userId => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  })
}

export const updateUser = (user, formData) => {

  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: formData,
    contentType: false,
    processData: false
  })
}