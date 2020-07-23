import React from "react";
import classes from "./OneFolder.module.css"
import PhotoCard from "./PhotoCard/PhotoCard";
import { NavLink } from "react-router-dom";

function OneFolder() {
    const cards = [];
    for (let i = 0; i < 3; i++) {
        cards.push("https://www.sunhome.ru/i/foto/211/bolshaya-panda.orig.jpg");
    }
    if (cards.length !== 4) {
        while (cards.length !== 4) {
            cards.push("");
        }
    }
    const row1 = cards.slice(0, 2);
    const row2 = cards.slice(2);
    return (
        <div className={classes.OneFile}>
            <NavLink to='/folderName' className={classes.files}>
                <div className={classes.filesRow}>
                    {row1.map(e => <PhotoCard url={e}/>)}
                </div>
                <div className={classes.filesRow}>
                    {row2.map(e => <PhotoCard url={e}/>)}
                </div>
            </NavLink>
            <div className={classes.name}>Name</div>
        </div>
    );
}

export default OneFolder;