import { RECEIVE_FOLLOW, REMOVE_FOLLOW, RECEIVE_FOLLOW_ERRORS, RECEIVE_ALL_FOLLOWERS } from '../actions/follow_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let removeFollowState = Object.assign({}, state);

  switch (action.type) {    
    case RECEIVE_ALL_FOLLOWERS:
      return Object.assign({}, state, action.followers);
    
    default:
      return state;
  }
}