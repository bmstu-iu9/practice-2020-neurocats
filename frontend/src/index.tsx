import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css"
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/state";


let renderTree = (state: any) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)}/>
    </BrowserRouter>,
    document.getElementById("root"),
  );
}
renderTree(store.getState());
serviceWorker.register();
