export const fetchUsers = () => {
  return $.ajax({
    method: 'get',
    url: '/api/users'
  })
}

export const fetchUser = userId => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${userId}`
  })
}

export const updateUser = user => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  })
}