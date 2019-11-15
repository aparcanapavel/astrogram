import React from 'react';
import { Link } from 'react-router-dom';
import SignupFormContainer from '../session/signup_form_container';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../../util/route_util';
import ImageIndexContainer from '../images/image_index_container';
import LoggedInContainer from './logged_in_container';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.currentUser ? (
      //render or redirect to feed index. for now, it'll display the current username
      <div>
        <div className="top-bar"><LoggedInContainer /></div>
       
        <div className="feed"><ImageIndexContainer /></div>
      </div>
    ) : (
      <section className="noUserWelcomeContainer">

        <div className="welcomePhones">
            <img src={window.images.splash} alt=""/>
        </div>

        <div>
          <AuthRoute path="/" component={SignupFormContainer} />
        </div>

      </section>
    );

    return display;
  }
}