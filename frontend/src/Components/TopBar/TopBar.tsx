import React from "react";
import classes from "./TopBar.module.css";
import logo from "../../logo.svg";
import { NavLink } from 'react-router-dom';
import SearchForm from "./SearchForm/SearchForm";
import {useUser} from "../../context";

function TopBar() {
    const user = useUser();

    return (
        <ul className = { classes.TopBar } >
            <li>
                <NavLink
                    to='/'
                    className={classes.item}
                    activeClassName={classes.active}
                >
                    <img src={logo} className={classes.img} alt="logo"/>
                    <span>Neurocats</span>
                </NavLink>
            </li>
            <li className={classes.search}>
                <SearchForm className={classes.searchForm}/>
            </li>
            <li>
                <NavLink
                    to={`/${user.id}`}
                    className={classes.item}
                    activeClassName={classes.active}>
                    <span>{user.name}</span>
                    <img
                        className={`${classes.img} ${classes.ava} ${user.photoUrl ? "" : classes.empty}`}
                        src={`http://localhost:5000/api${user.photoUrl}`} alt={"ava"}/>
                </NavLink>
            </li>
      </ul >
    );
}

export default TopBar;