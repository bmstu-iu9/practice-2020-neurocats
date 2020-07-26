import React from "react";
import classes from "./ButtonTemplate.module.css"

function ButtonTemplate(props: {name: string}) {
    return (
        <div>
            <a href="#s" className={classes.buttons}>{props.name}</a>
        </div>
    );
}

export default ButtonTemplate;