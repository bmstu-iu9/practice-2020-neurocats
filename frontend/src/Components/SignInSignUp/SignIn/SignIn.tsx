import React, {useCallback, useState} from "react";
import classes from "./SignIn.module.css"
import Button from "../../Button/Button";
import {useHistory} from "react-router";
import {useStores} from "../../../store/store";

interface Form {
    email: string;
    password: string;
}

function SignIn() {
    const history = useHistory();
    const {authStore} = useStores();
    const {signIn} = authStore;

    const [form, setForm] = useState<Form>({
        email: "",
        password: ""
    });

    const onFormChange = useCallback((value: string, name: keyof Form) => {
        setForm(form => ({...form, [name]: value}));
    }, []);

    const signInCallback = useCallback(async () => {
        const ok = await signIn(form.email, form.password);
        if (ok) {
            history.push("/");
        }
    }, [history, form, signIn]);

    return (
        <div className={classes.form}>
            <div className={classes.inputContainer}>
                E-mail:
                <input name="login" type="text" className={classes.item} value={form.email}
                       onChange={e => onFormChange(e.target.value, "email")}/>
            </div>
            <div className={classes.inputContainer}>
                Password: <input name="pass" type="password" className={classes.item} value={form.password}
                                 onChange={e => onFormChange(e.target.value, "password")}
                                 onKeyPress={e => {
                                     if (e.key === "Enter") {
                                         signInCallback();
                                     }
                                 }}
            />
            </div>

            <div className={classes.buttons}>
                <Button type={"dark"} onClick={signInCallback}>Sign in</Button>
                <Button type={"dark"} onClick={() => history.push("/signUp")}>Sign up</Button>
            </div>
        </div>
    );
}

export default SignIn;
