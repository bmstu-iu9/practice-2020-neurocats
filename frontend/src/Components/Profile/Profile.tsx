import React from "react";
import classes from "./Profile.module.css"
import Folders from "./Folders/Folders";
import UserInfo from "./UserInfo/UserInfo";
import IdentifyBreed from "./IdentifyBreed/IdentifyBreed";

function Profile(props: any) {
    return (
        <div className={classes.profile}>
            <div className={classes.item}><UserInfo {...props}/></div>
            <div className={classes.item}><Folders/></div>
            <div className={classes.item}><IdentifyBreed/></div>
        </div>
    );
}

export default Profile;
