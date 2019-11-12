import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from "../actions/session_actions";

export default (state = [], action) => { //state is an array because we want it to be an array or errors, not in object notation
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return []; // no errors, since the user logged in
    case RECEIVE_ERRORS:
      return action.errors;
    default:
      return state;
  }
}
