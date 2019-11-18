import { RECEIVE_ALL_IMAGES, RECEIVE_IMAGE, DELETE_IMAGE } from '../actions/image_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let deleteImageState = Object.assign({}, state);
  
  switch (action.type) {
    case RECEIVE_ALL_IMAGES:
      return Object.assign({}, action.payload.images);

    case RECEIVE_IMAGE:
      return Object.assign({}, state, { [action.image.id]: action.image });

    case DELETE_IMAGE:
      delete deleteImageState[action.imageId];
      return deleteImageState;

    case LOGOUT_CURRENT_USER:
      return {};
  
    default:
      return state;
  }
}