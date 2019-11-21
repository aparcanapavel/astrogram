import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

class GearOptions extends React.Component {
  logout() {
    this.props.logout().then(() => this.props.closeModal()).then(() => this.props.history.push('/'));
  }

  render() {
    return (
      <ul className="login-options-modal">
        <li>
          <a href="http://www.pavelaparcana.com" target="_blank">Developed by Pavel Aparcana</a>
        </li>
        <li onClick={() => this.logout()}>
          logout
        </li>
        <li onClick={() => this.props.closeModal()}>
          cancel
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
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
  }
}

export default withRouter(connect(mstp, mdtp)(GearOptions));