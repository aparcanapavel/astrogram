import { RECEIVE_ALL_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_ALL_IMAGES } from '../actions/image_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let deletedCommentState = Object.assign({}, state);
  
  switch (action.type) {
    case RECEIVE_ALL_COMMENTS:
      return Object.assign({}, action.comments);

    case RECEIVE_ALL_IMAGES:
      return Object.assign({}, state, action.payload.comments);
    
    case RECEIVE_COMMENT:
      return Object.assign({}, state, { [action.comment.id]: action.comment });

    case REMOVE_COMMENT:
      delete deletedCommentState[action.commentId];
      return deletedCommentState;
  
    default:
      return state;
  }
}