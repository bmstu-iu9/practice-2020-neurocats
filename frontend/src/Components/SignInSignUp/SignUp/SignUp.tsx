import React, { useState } from "react";
import classes from "./SignUp.module.css"
import ButtonTemplate from "../../Button/ButtonTemplate";

function SignUp(props: any) {
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
            <div className={classes.sign}>
                <ButtonTemplate name="Sign up" type="dark" to="#s" />
            </div>
            <div className={classes.sign}>
                <ButtonTemplate name="Sign in" type="dark" to="/signIn" />
            </div>
        </form>
    );
}

export default SignUp;
