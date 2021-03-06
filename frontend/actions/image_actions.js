import * as ImageAPI from '../util/image_api_util';

export const RECEIVE_ALL_IMAGES = 'RECEIVE_ALL_IMAGES';
export const RECEIVE_IMAGE = 'RECEIVE_IMAGE';
export const RECEIVE_IMAGE_ERRORS = 'RECEIVE_IMAGE_ERRORS';
export const DELETE_IMAGE = 'DELETE_IMAGE';

const receiveAllImages = payload => {
  return {
    type: RECEIVE_ALL_IMAGES,
    payload
  }
}

const receiveImage = image => {
  return {
    type: RECEIVE_IMAGE,
    image
  }
}

const receiveImageErrors = errors => {
  return {
    type: RECEIVE_IMAGE_ERRORS,
    errors
  }
}

const removeImage = imageId => {
  return {
    type: DELETE_IMAGE,
    imageId
  }
}

export const fetchImages = (userId) => dispatch => {

  return ImageAPI.fetchImages(userId)
    .then(payload => (dispatch(receiveAllImages(payload))), err => (
      dispatch(receiveImageErrors(err.responseJSON))
    ));
}

export const fetchImage = imageId => dispatch => {
  return ImageAPI.fetchImage(imageId)
  .then(image => dispatch(receiveImage(image)))
}

export const createImage = image => dispatch => {
  return ImageAPI.createImage(image)
    .then(image => (dispatch(receiveImage(image))), err => {
      return dispatch(receiveImageErrors(err.responseJSON))
    }
    );
}

export const deleteImage = imageId => dispatch => {
  return ImageAPI.deleteImage(imageId)
    .then(() => (dispatch(removeImage(imageId))))
}