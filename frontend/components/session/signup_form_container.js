import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup, login } from '../../actions/session_actions';

const mstp = (state) => {
  return {
    errors: state.errors.session
  }
}

const mdtp = dispatch => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user))
  }
}

export default connect(mstp, mdtp)(SignupForm);