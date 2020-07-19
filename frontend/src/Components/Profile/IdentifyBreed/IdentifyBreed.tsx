import React from "react";
import classes from "./IdentifyBreed.module.css"
import ButtonTemplate from "../Button/ButtonTemplate";

function IdentifyBreed() {
    return (
        <div className={classes.content}>
            <div className={classes.items}>
                <div className={classes.name}>Identify the breed</div>
                <ButtonTemplate name="Add photo"/>
            </div>
        </div>
    );
}

export default IdentifyBreed;