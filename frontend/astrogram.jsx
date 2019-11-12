import React from "react";
import ReactDOM from "react-dom";
import { logout, signup } from './util/session_api_util';
import configureStore from './store/store';
import Root from "./components/root";
import {login} from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {

  window.login = login;
  window.signup = signup;
  window.logout = logout;

  const store = configureStore();

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});