import React, { useState } from "react";
import classes from "./SignUp.module.css"
import Button from "../../Button/Button";
import {useHistory} from "react-router";

function SignUp() {
    const history = useHistory();

    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[repeatPass, setRepeatPass] = useState('');

    if (password === repeatPass) {
        console.log(username," ", email," ", password);
    }

    return (
        <form method="get" className={classes.form}>
            <div className={classes.inputContainer}>
                Username:  <input type="text" className={classes.item} 
                onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className={classes.inputContainer}>
                E-mail:  <input name="login" type="text" className={classes.item} 
                onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className={classes.inputContainer}>
                Password: <input name="pass" type="password" className={classes.item} 
                onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className={classes.inputContainer}>
                Repeat: <input name="pass" type="password" className={classes.item} 
                onChange={e => setRepeatPass(e.target.value)}/>
            </div>
            <div className={classes.buttons}>
                <Button type={"dark"} onClick={() => {}}>Sign up</Button>
                <Button type={"dark"} onClick={() => history.push("/signIn")}>Sign in</Button>
            </div>
        </form>
    );
}

export default SignUp;
