import React from "react";
import CatsFeed from "../CatsFeed/CatsFeed";
import classes from "./FolderPage.module.css"

function FolderPage(){
    return(
        <div className={classes.content}>
            <div className={classes.item}>FolderName</div>
            <CatsFeed/>
        </div>
    );
}

export default FolderPage;