import { connect } from 'react-redux';
import LoginForm from './login_form';
import { login } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';

const mstp = state => {
  return {
    errors: state.errors.session
  }
}

const mdtp = dispatch => {
  return {
    login: user => dispatch(login(user)),
    openModal: modal => dispatch(openModal(modal))
  }
}

export default connect(mstp,mdtp)(LoginForm);