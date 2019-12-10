import React from "react";
import ReactDOM from "react-dom";
import { logout, signup } from './util/session_api_util';
import configureStore from './store/store';
import Root from "./components/root";
const http = require("http");

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // setInterval(function () {
  //   http.get("https://astrogram-prod.herokuapp.com").mode("no-cors");
    
  // }, 3000); // every 5 minutes to keep site awake maybe make it longer?
  
  
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});