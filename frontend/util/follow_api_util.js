const FollowsAPI = {
  followUser: (follow) => {
    return $.ajax({
      url: `/api/follows`,
      method: 'POST',
      data: { follow }
    })
  },

  unfollowUser: followId => {
    return $.ajax({
      url: `/api/follows/${followId}`,
      method: 'DELETE'
    })
  },

  fetchFollowers: userId => {
    return $.ajax({
      method: 'GET',
      url: `/api/users/${userId}/follows`
    })
  }
}

export default FollowsAPI;