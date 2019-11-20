import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

class LoginOptions extends React.Component{
  loginUser(user) {
    this.props.login(user).then(() => this.props.closeModal());
  }
  
  render() {
    return (
      <ul className="login-options-modal">
        <li onClick={() => this.loginUser({ username: 'demoUser', password: 'password'})}>
          Log in as demoUser
        </li>
        <li onClick={() => this.loginUser({ username: 'masterAdmin', password: 'password'})}>
          log in as masterAdmin
        </li>
        <li onClick={() => this.loginUser({ username: 'galileo215', password: 'password'})}>
          log in as galileo215
        </li>
        <li onClick={() => this.loginUser({ username: 'einstein', password: 'password'})}>
          log in as einstein
        </li>
        <li onClick={() => this.loginUser({ username: 'newtonLaws', password: 'password'})}>
          log in as newtonLaws
        </li>
        <li onClick={() => this.loginUser({ username: 'kepler', password: 'password'})}>
          log in as kepler
        </li>
      </ul>
    )
  }
}


const mstp = state => {
  return {
    modal: state.ui.modal
  }
}

const mdtp = dispatch => {
  return {
    login: user => dispatch(login(user)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mstp, mdtp)(LoginOptions);