import React from "react";
import classes from "./Hello.module.css";
import Button from "../Button/Button";
import {useHistory} from "react-router";

function Hello() {
    const history = useHistory();

    return (
        <form method="get" className={classes.form}>
            <div>Work description:</div>
            <div className={classes.item}>The social network was created as part of a summer</div>
            <div>practice from the Bauman Moscow State</div>
            <div>Technical University. It allows users to share </div>
            <div>photos of cats and identify their breed</div>
            <div>using an embedded neural network.</div>
            <div className={classes.item}>&nbsp;</div>
            <div className={classes.item}>Team members:</div>
            <div className={classes.item}>Yulia Hrobak</div>
            <div className={classes.item}>Farida Bazartinova</div>
            <div className={classes.item}>Ilya Getikov</div>
            <div className={classes.item}>German Kulchitsky</div>
            <div className={classes.item}>Victor Florya</div>
            <div className={classes.buttons}>
                <Button type={"dark"} onClick={() => history.push("/signIn")}>Sign in</Button>
                <Button type={"dark"} onClick={() => history.push("/signUp")}>Sign up</Button>
            </div>
        </form>
    );
}

export default Hello;
