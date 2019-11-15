import { connect } from 'react-redux';
import { fetchImages } from '../../actions/image_actions'
import ImageIndex from './image_index';

const mstp = state => {

  return {
    images: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.id]
  }
}

const mdtp = dispatch => {
  return {
    fetchImages: () => dispatch(fetchImages())
  }
}

export default connect(mstp, mdtp)(ImageIndex);