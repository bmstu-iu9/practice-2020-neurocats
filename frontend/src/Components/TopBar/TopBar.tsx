import React from "react";
import "./TopBar.css";
import logo from "../../logo.svg";

function TopBar() {


    return (
        <div className={"TopBar"}>
            <img src={logo} alt="logo"/>
            <h1>NeuroCats</h1>
        </div>
    )
}

export default TopBar;