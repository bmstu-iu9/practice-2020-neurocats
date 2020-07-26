import React, {useState} from "react";
import "./App.css";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import { createBrowserHistory } from 'history';
import {UserProvider} from "../context";
import {User} from "../types";
import MainPage from "./SignInSignUp/MainPage";
import NotFound from "./404/404";
import MainApp from "./MainApp";

interface Props {
  user: User;
}

function App({user}: Props) {
  const [authed] = useState(true);
  return (
      <div className="App">
        <UserProvider value={user}>
          <Router history={createBrowserHistory()}>
            <Switch>
              <Route path={"/404"} exact><NotFound/></Route>
              {authed ? <MainApp/> : <MainPage/>}
              {/*<Route path={"/signIn"} exact><MainPage/></Route>*/}
              {/*<Route path={"/signUp"} exact><MainPage/></Route>*/}
              <Redirect to={"/404"}/>
            </Switch>
          </Router>
        </UserProvider>
      </div>
  );
}

export default App;