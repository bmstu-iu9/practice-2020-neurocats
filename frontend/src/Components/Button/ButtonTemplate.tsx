import React from "react";
import classes from "./ButtonTemplate.module.css"
import { NavLink } from "react-router-dom";

function ButtonTemplate(props: {name: string, type: string, to: string}) {
    let isLight = false;
    if (props.type === "light") {
        isLight = !isLight;
    }
    return (
        <div>
            {
                isLight ? (
                    <NavLink to="#s" className={`${classes.lightButton} ${classes.buttons}`}>{props.name}</NavLink>
                ) : (
                    <NavLink to={props.to} className={`${classes.darkButton} ${classes.buttons}`}>{props.name}</NavLink>
                )
            }
        </div>
    );
}

export default ButtonTemplate;