import classes from "./CatsPage.module.css";
import React from "react";
import CatCard from "../CatCard/CatCard";
import {CatsPhoto} from "../../types";

interface Props {
    cats: CatsPhoto[];
}

function CatsPage({cats}: Props) {

    return (
        <div className={classes.container}>
            <div className={classes.catsGrid}>
                {
                    cats.map(cat => <CatCard key={cat.id} cat={cat}/>)
                }
            </div>
        </div>
    );
}

export default CatsPage;