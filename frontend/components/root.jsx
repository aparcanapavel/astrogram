import { HashRouter } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import App from "./App";
import storage from 'local-storage-fallback';

const getInitialTheme = () =>{
  const userTheme = storage.getItem("userTheme");
  return userTheme ? JSON.parse(userTheme) : { userTheme: "light" }
}

const Root = ({ store }) => {
  const [userTheme] = useState(getInitialTheme);
  if (userTheme.userTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  useEffect(() => {
    storage.setItem('userTheme', JSON.stringify(userTheme))
  }, [userTheme]);

  return (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  )
};

export default Root;