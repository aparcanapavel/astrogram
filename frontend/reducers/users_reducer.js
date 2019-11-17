import { RECEIVE_ALL_USERS } from "../actions/user_actions";

//need to redo this to accept all the users
export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return Object.assign({}, state, action.users);
      
    default:
      return state;
  }
}