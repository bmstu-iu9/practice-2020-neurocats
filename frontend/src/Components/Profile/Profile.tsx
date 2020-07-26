import React from "react";
import classes from "./Profile.module.css"
import Folders from "./Folders/Folders";
import UserInfo from "./UserInfo/UserInfo";
import IdentifyBreed from "./IdentifyBreed/IdentifyBreed";
import Settings from "./Settings/Settings";

function Profile(props: any) {
    return (
        <div className={classes.profile}>
            <div className={classes.item}><UserInfo state={props.state} dispatch={props.dispatch}/></div>
            <div className={classes.item}><Folders state={props.state}/></div>
            <div className={classes.item}><IdentifyBreed state={props.state}/></div>
            <div className={classes.item}><Settings state={props.state} dispatch={props.dispatch}/></div>
        </div>
    );
}

export default Profile;
