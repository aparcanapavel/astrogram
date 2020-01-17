import React from 'react';
import SignupFormContainer from '../session/signup_form_container';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute } from '../../util/route_util';
import ImageIndexContainer from '../images/image_index_container';
import LoggedInContainer from './logged_in_container';
import UserShowContainer from '../profiles/user_show_container';
import OtherUserShowContainer from '../profiles/other_user_show_container';
import EditUserContainer from '../profiles/edit_profile';
import ImageShowContainer from '../images/images_show_container';
import ExplorePageContainer from '../explore/explore_page_container';

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
          <Route exact path={`/users/${this.props.currentUser.id}/profile`} component={UserShowContainer} />

          <Route path="/users/:id/profile" component={OtherUserShowContainer}/>

          <Route path="/account/edit" component={EditUserContainer} />

          <Route path="/feed/:id" component={ImageShowContainer} />

          <Route path="/explore" component={ExplorePageContainer} />
          
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

        <div className="signup-welcome">
          <AuthRoute path="/" component={SignupFormContainer} />
          <div className="signature">
            <p>Developed by <a href="https://pavelaparcana.com/">Pavel Aparcana</a></p>
          </div>
        </div>

        
      </section>
    );

    return display;
  }
}