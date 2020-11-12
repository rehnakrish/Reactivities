import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import './app/style.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import ScrollToTop from './layout/ScrollToTop';

export const history = createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Router history={history}>
  <ScrollToTop></ScrollToTop>
  <App />
  </Router>,
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
