import React, {useCallback} from "react";
import classes from "./CatCard.module.css";
import {CatsPhoto, User} from "../../types";
import { Link } from "react-router-dom";
import Axios from "axios";
import {useAsync} from "../../helps/useAsync";
import Loader from "../Loader/Loader";
import {useUser} from "../../context";
import ServerError from "../ServerError/ServerError";

interface Props {
    cat: CatsPhoto,
    refetchCats: () => void
}

function CatCard({ cat, refetchCats }: Props) {

    const myUser = useUser();

    // data loading (owner)
    const {result, loading, error} = useAsync(useCallback(() => Axios.get<User>(`/users/${cat?.owner}`), [cat]));

    const like = useCallback(async () => {
        try {
            await Axios.post(`/cats/${cat.id}/like`, myUser);
            await refetchCats();
        } catch (e) {
            console.log(e);
        }
    }, [refetchCats, cat, myUser]);
    const unLike = useCallback(async () => {
        try {
            await Axios.post(`/cats/${cat.id}/unlike`, myUser);
            await refetchCats();
        } catch (e) {
            console.log(e);
        }
    }, [refetchCats, cat, myUser]);

    if (loading) return <Loader/>;
    if (result === undefined || error) return <ServerError message={error?.message ?? "undefined cat owner"}/>;

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
            <div className={`${classes.like} ${cat.likes.includes(myUser.id) ? classes.liked : ""}`} onClick={cat.likes.includes(myUser.id) ? unLike : like}>
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