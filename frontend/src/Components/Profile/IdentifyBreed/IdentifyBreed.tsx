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
            <div className={classes.button}>
                <ButtonTemplate name="Add photo" type="light" to="#s" />
            </div>
        </div>
    );
}

export default IdentifyBreed;