import React, {useState} from "react";
import "./App.css";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
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
          <BrowserRouter>
            <Switch>
              <Route path={"/404"} exact><NotFound/></Route>
              {authed ? <MainApp/> : <MainPage/>}
              <Redirect to={"/404"}/>
            </Switch>
          </BrowserRouter>
        </UserProvider>
      </div>
  );
}

export default App;