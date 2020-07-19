import React from "react";
import classes from "./TopBar.module.css";
import logo from "../../logo.svg";
import { NavLink } from 'react-router-dom';
import SearchForm from "./SearchForm/SearchForm";

function TopBar() {
    return (
        <ul className = { classes.TopBar } >
            <li><img src={logo} alt="logo"/></li>
            <li className={classes.item}>
                <NavLink to='/home'>Home</NavLink>
            </li>
            <li><SearchForm/></li>
            <li className={classes.item}>
                <NavLink to='/profile'>Profile</NavLink>
            </li>
            <li><img className={classes.ava} src="https://www.sunhome.ru/i/foto/211/bolshaya-panda.orig.jpg" alt="ava"/></li>
      </ul >
    );
}

export default TopBar;