import { RECEIVE_ALL_IMAGES, RECEIVE_IMAGE, RECEIVE_IMAGE_ERRORS } from '../actions/image_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_IMAGES:
      return [];

    case RECEIVE_IMAGE:
      return [];

    case RECEIVE_IMAGE_ERRORS:
      return action.errors;
  
    default:
      return state;
  }
}