import React from "react";
import classes from "./MainPage.module.css"
import logo from "../../logo.svg"
import SignIn from "./SignIn/SignIn";
import {Redirect, Route, Switch} from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import Hello from "../Hello/Hello";


function MainPage() {
    return (
        <div className={classes.block}>
            <div className={classes.top}>
                <img className={classes.image} src={logo} alt="logo"/>
                <div className={classes.name}>NeuroСats</div>
            </div>
            <Switch>
                <Route path={"/signIn"} exact><SignIn/></Route>
                <Route path={"/signUp"} exact><SignUp/></Route>
                <Route path={"/"}><Hello/></Route>
                <Redirect to={"/404"}/>
            </Switch>
        </div>
    );
}

export default MainPage;
