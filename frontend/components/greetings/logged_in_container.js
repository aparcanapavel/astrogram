import { connect } from 'react-redux';
import LoggedIn from './logged_in';
import { logout } from '../../actions/session_actions';

const mstp = ({ entities, session }) => {
  return {
    currentUser: entities.users[session.id]
  }
}

const mdtp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mstp, mdtp)(LoggedIn);