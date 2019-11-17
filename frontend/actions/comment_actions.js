import * as CommentAPI from '../util/comment_api_util';

export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';

const receiveAllComments = comments => {
  return {
    type: RECEIVE_ALL_COMMENTS,
    comments
  }
}

const receiveComment = comment => {
  return {
    type: RECEIVE_COMMENT,
    comment
  }
}

const receiveCommentErrors = errors => {
  return {
    type: RECEIVE_COMMENT_ERRORS,
    errors
  }
}

export const fetchComments = (imageId) => dispatch => {
  return CommentAPI.fetchComments(imageId)
    .then(comments => (dispatch(receiveAllComments(comments))), err => (
      dispatch(receiveCommentErrors(err.responseJSON))
      ));
}

export const fetchComment = commentId => dispatch => {
  return CommentAPI.fetchComment(commentId)
    .then(comment => (dispatch(receiveComment(comment))), err => (
      dispatch(receiveCommentErrors(err.responseJSON))
    ));
}

export const createComment = comment => dispatch => {
  return CommentAPI.createComment(comment)
    .then(comment => (dispatch(receiveComment(comment))), err =>(
      dispatch(receiveCommentErrors(err.responseJSON))
    ));
}