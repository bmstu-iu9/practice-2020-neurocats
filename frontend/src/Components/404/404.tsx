import React from "react";
import classes from "./NotFound.module.css"
import photo from "./NPxmmcdK6kA.jpg"
import { NavLink } from "react-router-dom";

function NotFound() {
    return (
        <div className={classes.content}>
            <div className={classes.number}>404</div>
            <div className={classes.block}>
                <div className={classes.words}>
                    <div className={classes.item}>Sorry, page not found</div>
                    <NavLink to="/" className={`${classes.item} ${classes.linkk}`}>Click here and return to home page</NavLink>
                </div>
                <img className={classes.photo} src={photo} alt="pht"/>
            </div>
            
        </div>
    );
}

export default NotFound;