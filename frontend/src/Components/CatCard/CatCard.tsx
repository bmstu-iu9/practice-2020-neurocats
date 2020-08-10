import React, {useCallback, useState} from "react";
import classes from "./CatCard.module.css";
import {CatsPhoto} from "../../types";
import Axios from "axios";
import {useUser} from "../../context";
import Owner from "./Owner";
import useAxios from "axios-hooks";
import EmptyCatCard from "./EmptyCatCard";

interface Props {
    cat: CatsPhoto,
}

function CatCard(props: Props) {
    const [cat, setCat] = useState(props.cat);
    const myUser = useUser();

    const [, refetchCat] = useAxios<CatsPhoto>({
        url: `/cat/${cat.id}`
    }, {
        manual: true
    });

    const like = useCallback(async () => {
        try {
            await Axios.patch(`/cat/${cat.id}/like`, myUser);
            const {data: newCat} = await refetchCat();
            setCat(newCat);
        } catch (e) {
            console.log(e);
        }
    }, [refetchCat, cat, myUser]);
    const unLike = useCallback(async () => {
        try {
            await Axios.patch(`/cat/${cat.id}/unlike`, myUser);
            const {data: newCat} = await refetchCat();
            setCat(newCat);
        } catch (e) {
            console.log(e);
        }
    }, [refetchCat, cat, myUser]);

    if (!props.cat) return <EmptyCatCard/>

    return (
        <div className={classes.container}>
            <img
                className={`${classes.cat} ${cat.photoUrl ? "" : classes.emptyCat}`}
                src={`http://localhost:5000/api${cat.photoUrl}`} alt={"cat"}
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