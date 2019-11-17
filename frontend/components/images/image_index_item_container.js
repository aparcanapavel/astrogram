import { connect } from 'react-redux';
import { fetchComments } from '../../actions/comment_actions';
import ImageIndexItem from './image_index_item';

const mstp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    comments: Object.values(state.entities.comments)
  }
}

const mdtp = dispatch => {
  return {
    fetchComments: imageId => dispatch(fetchComments(imageId))
  }
}

export default connect(mstp, mdtp)(ImageIndexItem);