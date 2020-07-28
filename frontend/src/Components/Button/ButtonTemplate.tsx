import React from "react";
import classes from "./ButtonTemplate.module.css"
import { NavLink } from "react-router-dom";

interface Props {
    name: string, 
    type: string, 
    to: string
}

function ButtonTemplate({name, type, to} : Props) {
    let isLight = false;
    if (type === "light") {
        isLight = !isLight;
    }
    return (
        <div>
            {
                isLight ? (
                    <NavLink to="#s" className={`${classes.lightButton} ${classes.buttons}`}>{name}</NavLink>
                ) : (
                    <NavLink to={to} className={`${classes.darkButton} ${classes.buttons}`}>{name}</NavLink>
                )
            }
        </div>
    );
}

export default ButtonTemplate;