import { connect } from 'react-redux';
import LoggedIn from './logged_in';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import { fetchImages } from '../../actions/image_actions';
import { fetchUsers } from '../../actions/user_actions';

const mstp = ({ entities, session }) => {
  return {
    currentUser: entities.users[session.id]
  }
}

const mdtp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchImages: () => dispatch(fetchImages())
  }
}

export default connect(mstp, mdtp)(LoggedIn);