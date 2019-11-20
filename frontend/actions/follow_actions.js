import FollowsAPI from '../util/follow_api_util';

export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';
export const RECEIVE_FOLLOW_ERRORS = 'RECEIVE_FOLLOW_ERRORS';
export const RECEIVE_ALL_FOLLOWERS = 'RECEIVE_ALL_FOLLOWERS';

const receiveAllFollowers = followers => {
  return {
    type: RECEIVE_ALL_FOLLOWERS,
    followers
  }
}

const receiveFollow = follow => {
  return {
    type: RECEIVE_FOLLOW,
    follow
  }
}

const removeFollow = follow => {
  return {
    type: REMOVE_FOLLOW,
    follow
  }
}

const receiveFollowErrors = errors => {
  return {
    type: RECEIVE_FOLLOW_ERRORS,
    errors
  }
}

export const fetchFollowers = userId => dispatch => {
  return FollowsAPI.fetchFollowers(userId)
     .then(followers => (dispatch(receiveAllFollowers(followers))), err => (
       dispatch(receiveFollowErrors(err.responseJSON))
     ));
}

export const followUser = follow => dispatch => {
  return FollowsAPI.followUser(follow)
    .then(follow => { 
      dispatch(receiveFollow(follow))
    }, err => (
      dispatch(receiveFollowErrors(err.responseJSON))
    ));
}

export const unfollowUser = followId => dispatch => {
  return FollowsAPI.unfollowUser(followId)
    .then((follow) => { 
      dispatch(removeFollow(follow))
    }, err => (
      dispatch(receiveFollowErrors(err.responseJSON))
    ));
}