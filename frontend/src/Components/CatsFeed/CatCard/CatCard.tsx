import React, {useCallback} from "react";
import classes from "./CatCard.module.css";
import {CatsPhoto} from "../../../types";
import Axios from "axios";
import {useAsync} from "../../../helps/useAsync";
import {useUser} from "../../../context";
import EmptyCatCard from "./EmptyCatCard";
import Owner from "./Owner";

interface Props {
    catId: string,
}

function CatCard({ catId }: Props) {

    const myUser = useUser();

    // data loading (cat)
    const {result: catData, loading: loadCat, error: errorCat, refetch: refetchCat} = useAsync(useCallback(
        () => Axios.get<CatsPhoto>(`/cats/${catId}`), [catId]));

    const like = useCallback(async () => {
        try {
            await Axios.patch(`/cats/${catData?.data.id}/like`, myUser);
            await refetchCat();
        } catch (e) {
            console.log(e);
        }
    }, [refetchCat, catData, myUser]);
    const unLike = useCallback(async () => {
        try {
            await Axios.patch(`/cats/${catData?.data.id}/unlike`, myUser);
            await refetchCat();
        } catch (e) {
            console.log(e);
        }
    }, [refetchCat, catData, myUser]);

    if (!catData && loadCat) return <EmptyCatCard/>;
    if (!catData || errorCat) return <EmptyCatCard/>;

    const {data: cat} = catData;

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
            {cat.owner && <Owner ownerId={cat.owner}/>}
        </div>
    )
}

export default CatCard;