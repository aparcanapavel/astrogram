import { connect } from 'react-redux';
import { fetchComments, deleteComment, createComment } from '../../actions/comment_actions';
import { createLike, deleteLike, fetchLikes } from '../../actions/like_actions';
import { unfollowUser, followUser } from '../../actions/follow_actions';
import ImageShow from './image_show';
import { fetchImage } from '../../actions/image_actions';
import { fetchUsers } from '../../actions/user_actions';

const mstp = (state, ownProps) => {
  // debugger
  // const comments = Object.values(state.entities.comments).filter(comment => {
  //   console.log(comment);
  //   return comment.imageId === ownProps.match.params.id;
  // })

  // const likes = Object.values(state.entities.likes).filter(like => {
  //   console.log(like);
  //   return like.imageId === ownProps.match.params.id;
  // })
  let imageId = ownProps.match.params.id;
  let image = state.entities.posts[imageId];
  let imageAuthor;
  if(image){
    Object.values(state.entities.users).map(user => {
      if (image.authorId === user.id) {
        imageAuthor = user;
        console.log(imageAuthor)
      }
    })
  }

  return {
    image,
    imageId,
    imageAuthor,
    currentUser: state.entities.users[state.session.id],
    comments: Object.values(state.entities.comments),
    likes: Object.values(state.entities.likes),
    users: state.entities.users
  }
}

const mdtp = dispatch => {
  return {
    fetchComments: imageId => dispatch(fetchComments(imageId)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    createComment: comment => dispatch(createComment(comment)),
    createLike: like => dispatch(createLike(like)),
    deleteLike: likeId => dispatch(deleteLike(likeId)),
    followUser: follow => dispatch(followUser(follow)),
    unfollowUser: followId => dispatch(unfollowUser(followId)),
    fetchImage: imageId => dispatch(fetchImage(imageId)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchLikes: imageId => dispatch(fetchLikes(imageId))
  }
}

export default connect(mstp, mdtp)(ImageShow);