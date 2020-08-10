import React, {useCallback, useState} from "react";
import classes from "./SignUp.module.css"
import Button from "../../Button/Button";
import {useHistory} from "react-router";
import Axios from "axios";

interface Form {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

function SignUp() {
    const history = useHistory();

    const [error, setError] = useState("");
    const [form, setForm] = useState<Form>({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const onFormChange = useCallback((value: string, name: keyof Form) => {
        setForm(form => ({...form, [name]: value}));
    }, []);

    const signUpCallback = useCallback(async () => {
        console.log("try");
        if (form.password !== form.repeatPassword) {
            setError("Passwords don't match");
            return;
        }
        let ok = "";
        try {
            const res = await Axios.post(`/users`, {
                email: form.email,
                password: form.password,
                name: form.name,
            });
            console.log(res);
            ok = res.data.code;
        } catch (e) {
            setError(e);
            console.log(e);
        }
        if (ok === "SUCCESS") {
            history.push("/signUpSuccess");
        }
    }, [history, form, setError]);

    return (
        <div className={classes.form}>
            <div className={classes.inputContainer}>
                Username:
                <input type="text" className={classes.item}
                       onChange={e => onFormChange(e.target.value, "name")}/>
            </div>
            <div className={classes.inputContainer}>
                E-mail:
                <input name="login" type="text" className={classes.item}
                       onChange={e => onFormChange(e.target.value, "email")}/>
            </div>
            <div className={classes.inputContainer}>
                Password:
                <input name="pass" type="password" className={classes.item}
                       onChange={e => onFormChange(e.target.value, "password")}/>
            </div>
            <div className={classes.inputContainer}>
                Repeat:
                <input name="pass" type="password" className={classes.item}
                       onChange={e => onFormChange(e.target.value, "repeatPassword")}/>
            </div>
            {error &&
                <div className={classes.errorMsg}>{error}</div>
            }
            <div className={classes.buttons}>
                <Button type={"dark"} onClick={signUpCallback}>Sign up</Button>
                <Button type={"dark"} onClick={() => history.push("/signIn")}>Sign in</Button>
            </div>
        </div>
    );
}

export default SignUp;
