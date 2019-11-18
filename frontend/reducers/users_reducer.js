import { RECEIVE_ALL_USERS } from "../actions/user_actions";
import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions'

//need to redo this to accept all the users
export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return Object.assign({}, state, action.users);

    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
      
    case LOGOUT_CURRENT_USER:
      return {};

    default:
      return state;
  }
}