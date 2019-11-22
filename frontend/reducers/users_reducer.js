import { RECEIVE_ALL_USERS, RECEIVE_USER } from "../actions/user_actions";
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions'
import { RECEIVE_FOLLOW, REMOVE_FOLLOW, RECEIVE_FOLLOW_ERRORS, RECEIVE_ALL_FOLLOWERS } from '../actions/follow_actions';

//need to redo this to accept all the users
export default (state = {}, action) => {
  Object.freeze(state);
  const copyState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return Object.assign({}, state, action.users);

    case RECEIVE_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });

    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
      
    case RECEIVE_FOLLOW:
      copyState[action.follow.followeeId].followerIds.push(action.follow.followerId);
      copyState[action.follow.followerId].followeeIds.push(action.follow.followeeId);

      return copyState;

    case REMOVE_FOLLOW:
      let followeeIds = copyState[action.follow.followeeId].followerIds;
      const followeeIdx = followeeIds.indexOf(action.follow.followerId);
      let followerIds = copyState[action.follow.followerId].followeeIds;
      const followerIdx = followerIds.indexOf(action.follow.followeeId);
      delete followeeIds[followeeIdx];
      delete followerIds[followerIdx];

      followeeIds.filter(function(e){return e}); 
      followerIds.filter(function(e){return e}); 
      
      return copyState;

    case LOGOUT_CURRENT_USER:
      return {};

    default:
      return state;
  }
}