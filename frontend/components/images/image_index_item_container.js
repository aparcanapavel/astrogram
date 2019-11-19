import { connect } from 'react-redux';
import { fetchComments, deleteComment, createComment } from '../../actions/comment_actions';
import ImageIndexItem from './image_index_item';
import { createLike, deleteLike } from '../../actions/like_actions';

const mstp = (state, ownProps) => {
  const comments = Object.values(state.entities.comments).filter(comment => {
    return comment.imageId === ownProps.img.id;
  })

  const likes = Object.values(state.entities.likes).filter(like => {
    return like.imageId === ownProps.img.id;
  })
  return {
    currentUser: state.entities.users[state.session.id],
    comments,
    likes
  }
}

const mdtp = dispatch => {
  return {
    fetchComments: imageId => dispatch(fetchComments(imageId)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    createComment: comment => dispatch(createComment(comment)),
    createLike: like => dispatch(createLike(like)),
    deleteLike: likeId => dispatch(deleteLike(likeId))
  }
}

export default connect(mstp, mdtp)(ImageIndexItem);