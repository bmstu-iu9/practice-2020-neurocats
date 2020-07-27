import React from "react";
import classes from "./IdentifyBreed.module.css"
import ButtonTemplate from "../../Button/ButtonTemplate";

interface Props {
    id: number
}

function IdentifyBreed({id} : Props) {
    return (
        <div className={classes.contentPink}>
            <div className={classes.name}>Identify the breed</div>
            <button className={classes.button1}>
                <ButtonTemplate name="Add photo" type="light" to="#s" />
            </button>
        </div>
    );
}

export default IdentifyBreed;