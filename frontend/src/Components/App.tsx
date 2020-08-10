import React from "react";
import "./App.css";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {UserProvider} from "../context";
import MainPage from "./SignInSignUp/MainPage";
import NotFound from "./404/404";
import MainApp from "./MainApp";
import {useStores} from "../store/store";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

function App() {
    const {authStore} = useStores();
    const {user} = authStore;

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path={"/404"} exact><NotFound/></Route>
                    {user ? <UserProvider value={toJS(user)}><MainApp/></UserProvider> : <MainPage/>}
                    <Redirect to={"/404"}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default observer(App);