import React from "react";
import './SearchForm.module.css'

function SearchForm() {
    return (
        <form>
            <input type="text" placeholder="Search"/>
            <button type="submit"><i className="fas fa-search"></i></button>
        </form>
    );
}

export default SearchForm;