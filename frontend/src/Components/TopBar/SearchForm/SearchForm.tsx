import React from "react";
import classes from "./SearchForm.module.css";

interface Props {
    className?: string
}

function SearchForm({className}: Props) {
    return (
        <div className={`${classes.container} ${className}`}>
            <input className={classes.input} type="text" placeholder="Search"/>
            <button className={classes.btn}>
                <i className="fas fa-search"/>
            </button>
        </div>
    );
}

export default SearchForm;