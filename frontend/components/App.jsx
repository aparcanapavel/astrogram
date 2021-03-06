import React from 'react';
import GreetingContainer from './greetings/greeting_container';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import { AuthRoute } from '../util/route_util';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <Switch>
        <AuthRoute path="/login" component={LoginFormContainer} />      
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <Route path='/'>
          <GreetingContainer />
        </Route>
      </Switch>
    </div>
  }
}