import React from "react";
import classes from "./SignUpSuccess.module.css"
import Button from "../../Button/Button";
import {useHistory} from "react-router";

function SignUpSuccess() {
    const history = useHistory();

    return (
        <div className={classes.form}>
            <div className={classes.block}>
                <div className={classes.inputContainer}>
                    <span>Everything is fine!</span>
                </div>
                <Button type={"dark"} onClick={() => history.push("/signIn")}>You can log in now</Button>
            </div>
            <Button type={"dark"} onClick={() => history.push("/")}>MainPage</Button>
        </div>
    );
}

export default SignUpSuccess;
