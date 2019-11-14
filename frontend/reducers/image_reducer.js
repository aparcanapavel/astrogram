import { RECEIVE_ALL_IMAGES } from '../actions/image_actions';

export default (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_IMAGES:
      return Object.assign({}, action.images);
  
    default:
      return state;
  }
}