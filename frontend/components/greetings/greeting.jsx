import React from 'react';
import SignupFormContainer from '../session/signup_form_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../../util/route_util';
import ImageIndexContainer from '../images/image_index_container';
import LoggedInContainer from './logged_in_container';
import UserShowContainer from '../profiles/user_show_container';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.currentUser ? (
      //render or redirect to feed index. for now, it'll display the current username
      <div>
        <div className="top-bar"><LoggedInContainer /></div>
        <Switch>
          <Route path="/profile">
            <UserShowContainer/>
          </Route>
          <Route path="/">
            <div className="feed"><ImageIndexContainer /></div>
          </Route >
        </Switch>
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