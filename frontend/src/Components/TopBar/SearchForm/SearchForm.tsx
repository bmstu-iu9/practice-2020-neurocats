import React from "react";
import './SearchForm.module.css'

function SearchForm() {
    return (
        <form>
            <input type="text" placeholder="Search"/>
            <button type="submit"><i className="fas fa-search"/></button>
        </form>
    );
}

export default SearchForm;