import React from "react";
import classes from "./TopBar.module.css";
import logo from "../../logo.svg";
import { NavLink } from 'react-router-dom';
import SearchForm from "./SearchForm/SearchForm";

function TopBar() {
    return (
        <div className = { classes.TopBar } >
            <div>
                <img src={logo} alt="logo"/>
            </div>
            <div>
                <NavLink to='/home' className={classes.name}>Home</NavLink>
            </div>
            <div className={classes.item}>
                <SearchForm/>
            </div>
            <div>
                <NavLink to='/profile' className={classes.name}>Profile</NavLink>
            </div>
            <div>
                <img className={classes.ava} src="https://www.sunhome.ru/i/foto/211/bolshaya-panda.orig.jpg" alt="ava"/>
            </div>
      </div>
    );
}

export default TopBar;