import React from 'react';

export default class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return <nav className="nav-bar">
      <ul>
        <li><i className="fab fa-instagram"></i></li>
        <li><h1 className='astrogram-title'>Astrogram</h1></li>
        <li><input type="text" placeholder="search users"/></li>
        <li><i className="fas fa-camera-retro"></i></li>
        <li><i className="far fa-heart"></i></li>
        <li><i className="far fa-user"></i></li>
      </ul>
    </nav>
  }
}