import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import UserShow from './user_show';
import { openModal } from '../../actions/modal_actions';
import { fetchImages } from '../../actions/image_actions';

const mstp = ({ entities, session }) => {
  return {
    user: entities.users[session.id],
    posts: Object.values(entities.posts)
  }
}

const mdtp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
    fetchImages: (userId) => dispatch(fetchImages(userId))
  }
}

export default connect(mstp, mdtp)(UserShow);