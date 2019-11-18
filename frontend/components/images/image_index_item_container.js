import { connect } from 'react-redux';
import { fetchComments, createComment } from '../../actions/comment_actions';
import ImageIndexItem from './image_index_item';

const mstp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    comments: Object.values(state.entities.comments)
  }
}

const mdtp = dispatch => {
  return {
    fetchComments: imageId => dispatch(fetchComments(imageId)),
    createComment: comment => dispatch(createComment(comment))
  }
}

export default connect(mstp, mdtp)(ImageIndexItem);