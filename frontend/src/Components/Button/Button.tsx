import React from "react";
import classes from "./Button.module.css"

interface Props {
    className?: string;
    type: "light" | "dark";
    onClick: () => void;
    children: string;
}

function Button({className, type, onClick, children} : Props) {
    return (
        <button onClick={onClick} className={`${classes.button} ${type === "light" ? classes.lightButton : classes.darkButton} ${className}`}>
            {children}
        </button>
    );
}

export default Button;