import React from "react";
import classes from "./SignIn.module.css"
import ButtonTemplate from "../../Button/ButtonTemplate";

function SignIn(props: any) {
    return (
            <form method="get" className={classes.form}>
                <div className={classes.inputContainer}>
                    E-mail:  
                    <input name="login" type="text" className={classes.item}/>
                </div>
                <div className={classes.inputContainer}>
                    Password: <input name="pass" type="password" className={classes.item}/>
                </div>
                <div className={classes.sign}>
                    <ButtonTemplate name="Sign in" type="dark" to="/home"/>
                </div>
                <div className={classes.sign}>
                    <ButtonTemplate name="Sign up" type="dark" to="/signUp"/>
                </div>
            </form>
    );
}

export default SignIn;
