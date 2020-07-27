import React, { useCallback, useEffect, useState } from "react";
import classes from "./CatCard.module.css";
import { CatsPhoto } from "../../types";
import { useUser } from "../../context";
import { Link } from "react-router-dom";
import Axios from "axios";

interface Props {
    cat: CatsPhoto | undefined
}

function CatCard({ cat }: Props) {
    const user = useUser();
    const [owner, setOwner] = useState();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await Axios.get(`/users/${cat?.owner}`);
                console.log(data)
                setOwner(data);
            } catch (e) {
                console.log("Some server error:", e);
            }
        })();
    }, [setOwner, cat]);

    const like = useCallback(() => {
        //TODO wait for backend
    }, []);

    if (cat === undefined) return <div className={classes.emptyCard} />

    return (
        <div className={classes.container}>
            <img
                className={`${classes.cat} ${cat.photoUrl ? "" : classes.emptyCat}`}
                src={`http://localhost:5000${cat.photoUrl}`} alt={"ava"}
            />
            <div className={classes.cover} />
            <div className={classes.breed}>
                <span>{cat.breed}</span>
            </div>
            <div className={classes.like} onClick={like}>
                <i className="fas fa-heart" />
                <span>&nbsp;5</span>
            </div>
            <Link className={classes.owner} to={owner ? `/${cat.owner}` : "/neurocats"}>
                <img
                    className={`${classes.ava} ${owner?.photoUrl ? "" : classes.empty}`}
                    src={`http://localhost:5000/photo/0412c29576c708cf0155e8de242169b1.jpg`} alt={"ava"}
                />
                <span className={classes.name}>Name</span>
            </Link>
        </div>
    )
}
// TODO fix owner.photo

export default CatCard;