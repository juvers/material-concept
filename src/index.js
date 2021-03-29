import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { register } from './serviceWorker';
import "./index.css";
// import 'bootstrap/dist/css/bootstrap.css';
import 'react-dropzone-uploader/dist/styles.css';
import "assets/scss/hhi.scss";
import RootApp from 'base/RootApp';

const hist = createBrowserHistory();
const baseUri = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
  <RecoilRoot>
    <Router history={hist} basename={baseUri}>
      <RootApp />
    </Router>
  </RecoilRoot>,
  document.getElementById("root")
);

register();
