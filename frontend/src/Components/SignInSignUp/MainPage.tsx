import React from "react";
import classes from "./MainPage.module.css"
import logo from "../../logo.svg"
import SignIn from "./SignIn/SignIn";
import { Route } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import Hello from "../Hello/Hello";


function MainPage(props: any) {
    return (
        <div className={classes.block}>
            <div className={classes.top}>
                <img className={classes.image} src={logo} alt="logo"/>
                <div className={classes.name}>NeuroСats</div>
            </div>
            
            <Route path='/signIn' render = {() => <SignIn/>}/>
            <Route path='/signUp' render = {() => <SignUp/>}/>
            <Route path='/hello' render = {() => <Hello/>}/>
        </div>
    );
}

export default MainPage;
