import React from "react";
import classes from "./SignIn.module.css"
import Button from "../../Button/Button";
import {useHistory} from "react-router";

function SignIn() {
    const history = useHistory();

    return (
        <form method="get" className={classes.form}>
            <div className={classes.inputContainer}>
                E-mail:
                    <input name="login" type="text" className={classes.item} />
            </div>
            <div className={classes.inputContainer}>
                Password: <input name="pass" type="password" className={classes.item} />
            </div>

            <div className={classes.buttons}>
                <Button type={"dark"} onClick={() => history.push("/home")}>Sign in</Button>
                <Button type={"dark"} onClick={() => history.push("/signUp")}>Sign up</Button>
            </div>
        </form>
    );
}

export default SignIn;
