import { RECEIVE_ALL_IMAGES, RECEIVE_IMAGE } from '../actions/image_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_IMAGES:
      return Object.assign({}, action.images);

    case RECEIVE_IMAGE:
      return Object.assign({}, state, { [action.image.id]: action.image });
  
    default:
      return state;
  }
}