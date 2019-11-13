import React from 'react';
import { Link } from 'react-router-dom';
import SignupFormContainer from '../session/signup_form_container';

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
      <section className="noUserWelcomeContainer">
        <div className="welcomePhones">
            {/* <img src='./app/assets/images/phones2.png'/> */}
            <img src={window.images.splash} alt=""/>
        </div>
        <div>
          <SignupFormContainer />
        </div>
        {/* <Link className="btn" to="/signup">Sign Up</Link>
        <Link className="btn" to="/login">Log In</Link> */}
      </section>
    );

    return display;
  }
}