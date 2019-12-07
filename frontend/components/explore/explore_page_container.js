import { connect } from 'react-redux';
import ExplorePage from './explore_page';
import { fetchImages, deleteImage } from '../../actions/image_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchComments } from '../../actions/comment_actions';

const mstp = state => {
  return {
    images: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
    posts: Object.values(state.entities.posts)
  }
}

const mdtp = dispatch => {
  return {
    fetchImages: () => dispatch(fetchImages()),
    deleteImage: imageId => dispatch(deleteImage(imageId)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchComments: imageId => dispatch(fetchComments(imageId))
  }
}

export default connect(mstp, mdtp)(ExplorePage);