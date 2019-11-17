import { connect } from 'react-redux';
import { fetchImages, deleteImage } from '../../actions/image_actions';
import { fetchUsers } from '../../actions/user_actions';
import ImageIndex from './image_index';

const mstp = state => {
  return {
    images: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users
  }
}

const mdtp = dispatch => {
  return {
    fetchImages: () => dispatch(fetchImages()),
    deleteImage: imageId => dispatch(deleteImage(imageId)),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mstp, mdtp)(ImageIndex);