import React from 'react';
import { Link } from 'react-router-dom';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.currentUser ? (
      //render or redirect to feed index. for now, it'll display the current username
      <div>
        <h2>Welcome {this.props.currentUser.username}</h2>
        <button onClick={this.props.logout}>Log Out</button>
      </div>
    ) : (
      <div className="noUserWelcome">
        <Link className="btn" to="/signup">Sign Up</Link>
        <Link className="btn" to="/login">Log In</Link>
      </div>
    );

    return display;
  }
}