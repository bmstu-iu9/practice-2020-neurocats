import React, {useCallback, useState} from "react";
import classes from "./CatCard.module.css";
import {CatsPhoto, User} from "../../types";
import { Link } from "react-router-dom";
import Axios from "axios";
import {useAsync} from "../../helps/useAsync";
import Loader from "../Loader/Loader";
import {useUser} from "../../context";

interface Props {
    cat: CatsPhoto,
}

function CatCard({ cat }: Props) {

    const myUser = useUser();
    const [myLike, setMyLike] = useState(cat.likes.indexOf(myUser.id) !== -1);

    const like = useCallback(() => {
        setMyLike(true);
        // TODO like
    }, [myLike, setMyLike]);
    const unLike = useCallback(() => {
        setMyLike(false);
        // TODO unlike
    }, [myLike, setMyLike]);

    // data loading (owner)
    const {result, loading, error} = useAsync(useCallback(() => Axios.get<User>(`/users/${cat?.owner}`), []));
    if (loading) return <Loader/>;
    // TODO insert <Error msg={error}/>
    if (result === undefined || error) console.log("Owner error");

    const owner = result!.data;

    return (
        <div className={classes.container}>
            <img
                className={`${classes.cat} ${cat.photoUrl ? "" : classes.emptyCat}`}
                src={`http://localhost:5000/api${cat.photoUrl}`} alt={"ava"}
            />
            <div className={classes.cover} />
            <div className={classes.breed}>
                <span>{cat.breed}</span>
            </div>
            <div className={`${classes.like} ${myLike ? classes.liked : ""}`} onClick={myLike ? unLike : like}>
                <i className="fas fa-heart" />
                <span>&nbsp;{cat.likes.length}</span>
            </div>
            <Link className={classes.owner} to={owner ? `/${cat.owner}` : "/neurocats"}>
                <img
                    className={`${classes.ava} ${owner.photoUrl ? "" : classes.empty}`}
                    src={`http://localhost:5000/api${owner.photoUrl}`} alt={"ava"}
                />
                <span className={classes.name}>{owner.name}</span>
            </Link>
        </div>
    )
}

export default CatCard;