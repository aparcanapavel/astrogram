const FollowsAPI = {
  followUser: userId => FollowsAPI.changeFollowStatus(userId, 'POST'),

  unfollowUser: userId => FollowsAPI.changeFollowStatus(userId, 'DELETE'),

  changeFollowStatus: (id, method) => {
    return $.ajax({
      url: `/api/users/${id}/follows`,
      method
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