import React from "react";
import classes from "./OneFolder.module.css"
import PhotoCard from "./PhotoCard/PhotoCard";
import {Link} from "react-router-dom";

interface Props {
    id: number,
    breed: string,
}

function OneFolder({id, breed}: Props) {
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
            <Link to={`/${id}/folder`} className={classes.files}>
                <div className={classes.filesRow}>
                    {row1.map((e, i) => <PhotoCard key={i} url={e}/>)}
                </div>
                <div className={classes.filesRow}>
                    {row2.map((e, i) => <PhotoCard key={i} url={e}/>)}
                </div>
            </Link>
            <div className={classes.name}>{breed}</div>
        </div>
    );
}

export default OneFolder;