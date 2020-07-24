import React from "react";
import './SearchForm.module.css'
import classes from "./SearchForm.module.css";

function SearchForm() {
    return (
        <form className={classes.content}>
            <input type="text" placeholder="Search" className={classes.SearchForm}/>
            <button type="submit"><i className="fas fa-search"/></button>
        </form>
    );
}

export default SearchForm;