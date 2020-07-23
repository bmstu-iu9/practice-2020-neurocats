import React from "react";
import classes from "./IdentifyBreed.module.css"
import ButtonTemplate from "../../Button/ButtonTemplate";

function IdentifyBreed() {
    return (
        <div className={classes.content}>
                <div className={classes.name}>Identify the breed</div>
                <div className={classes.button}>
                    <ButtonTemplate name="Add photo" type="light" to="#s"/>
                </div>
        </div>
    );
}

export default IdentifyBreed;