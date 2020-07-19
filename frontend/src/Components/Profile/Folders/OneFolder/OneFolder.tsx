import React from "react";
import classes from "./OneFolder.module.css"
import PhotoCard from "./PhotoCard/PhotoCard";
import { NavLink } from "react-router-dom";

function OneFolder() {
    return (
        <div className={classes.OneFile}>
            <NavLink to='/folderName' className={classes.files}>
                <div className={classes.filesRow}>
                    <PhotoCard />
                    <PhotoCard />
                </div>
                <div className={classes.filesRow}>
                    <PhotoCard />
                    <PhotoCard />
                </div>
            </NavLink>
            <div className={classes.name}>Name</div>
        </div>
    );
}

export default OneFolder;