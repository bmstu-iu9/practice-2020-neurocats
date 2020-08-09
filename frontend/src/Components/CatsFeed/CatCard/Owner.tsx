import classes from "./CatCard.module.css";
import {Link} from "react-router-dom";
import React, {useCallback} from "react";
import {useAsync} from "../../../helps/useAsync";
import Axios from "axios";
import {User} from "../../../types";
import Loader from "../../Loader/Loader";

interface Props {
    ownerId: number;
}

function Owner({ownerId}: Props) {

    // data loading (owner)
    const {result: ownerData, loading: loadOwner, error: errorOwner} = useAsync(useCallback(
        () => Axios.get<User>(`/users/${ownerId}`), [ownerId]));

    //if (loadOwner) return <Loader/>;
    if (!ownerData || errorOwner) return <div/>;

    const {data: owner} = ownerData;

    return(
        <Link className={classes.owner} to={owner ? `/${owner.id}` : "/neurocats"}>
            <img
                className={`${classes.ava} ${owner.photoUrl ? "" : classes.empty}`}
                src={`http://localhost:5000/api${owner.photoUrl}`} alt={"ava"}
            />
            <span className={classes.name}>{owner.name}</span>
        </Link>
    )
}

export default Owner;