import React from "react";
import classes from "./UserInfo.module.css"
import "./UserInfo.css"

function UserInfo(props: any) {
    return (
        <div className={classes.UserInfo}>
            <img src={props.user.photoUrl} alt="ava" />
            <div className={classes.name}>@{props.user.name}</div>
        </div>
    );
}

export default UserInfo;
