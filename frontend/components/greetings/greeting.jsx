import React from 'react';
import SignupFormContainer from '../session/signup_form_container';
import { Route, Switch, Link } from 'react-router-dom';
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
    this.state = {
      mobile: null
    }
  }

  componentDidMount(){
    let width = window.innerWidth;
    if (width < 800) {
      this.setState({ mobile: true });
    } else if (width >= 800) {
      this.setState({ mobile: false })
    }
  }

  render() {
    window.addEventListener('resize', (e) => {
      let width = e.currentTarget.innerWidth;
      if (width < 800 && this.state.mobile !== true) {
        this.setState({ mobile: true });
      } else if (width >= 800 && this.state.mobile !== false) {
        this.setState({ mobile: false })
      }
    });
    const display = this.props.currentUser ? (
      //render or redirect to feed index. for now, it'll display the current username
      <div>
        <div className="top-bar">
          <LoggedInContainer mobile={this.state.mobile}/>
        </div>
        <div className="feed" id="feed">
          <Switch>
            <Route exact path={`/users/${this.props.currentUser.id}/profile`} 
            render={props => (
              <UserShowContainer
                {...props}
                mobile={this.state.mobile}
              />
            )} />

            <Route path="/users/:id/profile"
              render={props => (
                <OtherUserShowContainer
                  {...props}
                  mobile={this.state.mobile}
                />
              )}
            />

            <Route path="/account/edit"
              render={props => (
                <EditUserContainer
                  {...props}
                  mobile={this.state.mobile}
                />
              )}
            />

            <Route path="/feed/:id" 
              render={props => (
                <ImageShowContainer
                  {...props}
                  mobile={this.state.mobile}
                />
              )}
            />

            <Route path="/explore" component={ExplorePageContainer} />
            
            <Route path="/">
              <ImageIndexContainer />
            </Route >
          </Switch>
        </div>
      </div>
    ) : (this.state.mobile ? (
      <section className="noUserWelcomeContainer">
        <div className="two-phones">
          <img src={window.images.splash} alt="" />
        </div>
        <div className="mobile-splash">
          <p>Welcome to</p>
          <h1 className="astrogram-title">Astrogram</h1>
          <Link to="/login">Log In</Link>
          <p className="or-separator">OR</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </section>
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
    ));

    return display;
  }
}