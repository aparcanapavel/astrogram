import * as ImageAPI from '../util/image_api_util';

export const RECEIVE_ALL_IMAGES = 'RECEIVE_ALL_IMAGES';

const receiveAllImages = images => {
  return {
    type: RECEIVE_ALL_IMAGES,
    images
  }
}

export const fetchImages = () => dispatch => {
  return ImageAPI.fetchImages()
    .then(images => { 
      dispatch(receiveAllImages(images))} );
}