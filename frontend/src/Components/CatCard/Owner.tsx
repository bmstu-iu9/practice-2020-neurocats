import classes from "./CatCard.module.css";
import {Link} from "react-router-dom";
import React from "react";
import useAxios from "axios-hooks";
import {User} from "../../store/AuthStore/types";

interface Props {
    ownerId: number;
}

function Owner({ownerId}: Props) {

    // data loading (owner)
    // const {result: ownerData, loading: loadOwner, error: errorOwner} = useAsync(useCallback(
    //     () => Axios.get<User>(`/users/${ownerId}`), [ownerId]));
    const [{data: owner, loading: loadOwner, error: errorOwner}] = useAxios<User>({
        url: `/users/${ownerId}`
    });

    if (loadOwner) return <div className={classes.owner}/>;
    if (!owner || errorOwner) return <div className={classes.owner}/>;

    return (
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