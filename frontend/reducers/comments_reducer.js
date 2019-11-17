import { RECEIVE_ALL_COMMENTS, RECEIVE_COMMENT } from '../actions/comment_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_ALL_COMMENTS:
      return Object.assign({}, state, action.comments);

    case RECEIVE_COMMENT:
      return Object.assign({}, state, { [action.comment.id]: action.comment })
  
    default:
      return state;
  }
}