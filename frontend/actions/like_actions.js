import * as LikeAPI from '../util/like_api_util';

export const RECEIVE_ALL_LIKES = 'RECEIVE_ALL_LIKES';
export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const DELETE_LIKE = 'DELETE_LIKE';
export const RECEIVE_LIKE_ERRORS = 'RECEIVE_LIKE_ERRORS';

const receiveAllLikes = likes => {
  return {
    type: RECEIVE_ALL_LIKES,
    likes
  }
};

const receiveLike = like => {
  return {
    type: RECEIVE_LIKE,
    like
  }
};

const removeLike = likeId => {
  return {
    type: DELETE_LIKE,
    likeId
  }
};

const receiveLikeErrors = errors => {
  return {
    type: RECEIVE_LIKE_ERRORS,
    errors
  }
};

export const fetchLikes = imageId => dispatch => {
  return LikeAPI.fetchLikes(imageId)
    .then(likes => {
      dispatch(receiveAllLikes(likes))
    }, err => (
      dispatch(receiveLikeErrors(err.responseJSON))
    ));
}

export const fetchLike = likeId => dispatch => {
  return LikeAPI.fetchLike(likeId)
    .then(like => (dispatch(receiveLike(like))), err => (
      dispatch(receiveLikeErrors(err.responseJSON))
    ));
}

export const createLike = like => dispatch => {
  return LikeAPI.createLike(like)
    .then(like => (dispatch(receiveLike(like))), err => (
      dispatch(receiveLikeErrors(err.responseJSON))
    ));
}

export const deleteLike = likeId => dispatch => {
  return LikeAPI.deleteLike(likeId)
    .then(() => dispatch(removeLike(likeId)), err => (
      dispatch(receiveLikeErrors(err.responseJSON))
    ));
}