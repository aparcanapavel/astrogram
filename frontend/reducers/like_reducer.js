import { RECEIVE_ALL_LIKES, RECEIVE_LIKE, RECEIVE_LIKE_ERRORS, DELETE_LIKE } from '../actions/like_actions';
import { RECEIVE_ALL_IMAGES } from '../actions/image_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  let unlikedState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_ALL_LIKES:
      return Object.assign({}, state, action.likes);

    case RECEIVE_LIKE:
      return Object.assign({}, state, {[action.like.id]: action.like});
      
    case RECEIVE_ALL_IMAGES:
      return Object.assign({}, state, action.payload.likes);

    case DELETE_LIKE:
      delete unlikedState[action.likeId];
      return unlikedState;
  
    default:
      return state;
  }
}
