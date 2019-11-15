import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../modal/modal';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.toHome = this.toHome.bind(this);
  }

  toHome() {
    this.props.history.push('/');
  }

  componentDidMount() {
    // this.props.openModal('newPost');
  }

  render () {
    return <nav className="nav-bar">
      <ul className="nav-list">
        <li onClick={this.toHome}><i className="fab fa-instagram"></i><h1 className='astrogram-nav'>Astrogram</h1></li>
        <li><input type="text" placeholder="search users"/></li>
        <li onClick={() => this.props.openModal('newPost')}><i className="fas fa-camera-retro"></i></li>
        <li><i className="far fa-heart"></i></li>
        <li><i className="far fa-user"></i></li>
      </ul>
      <Modal />
    </nav>
  }
}

export default withRouter(LoggedIn);