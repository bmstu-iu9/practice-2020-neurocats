import React, {useCallback} from "react";
import classes from "./OneFolder.module.css"
import {Link} from "react-router-dom";
import {useAsync} from "../../../../helps/useAsync";
import Axios from "axios";
import {CatsPhoto} from "../../../../types";
import Loader from "../../../Loader/Loader";

interface Props {
    id: number,
    breed: string,
}

function OneFolder({id, breed}: Props) {

    // data loading (cats)
    const {result, loading, error} = useAsync(useCallback(
        () => Axios.get<CatsPhoto[]>(`/users/${id}/cats/${breed}`, {
            params: {
                limit: 4
            }
        }), [id, breed]));

    if (loading) return <Loader/>;
    if (!result || error || !result.data.length) return <div>Error...</div>;

    const {data: cats} = result;

    return (
        <Link to={`/${id}/folder/${breed}`} className={classes.OneFile}>
            <div className={classes.files}>
                {cats.map((e, i) => <div key={i} className={classes.card}>
                    <img
                        className={`${classes.photo}`}
                        src={`http://localhost:5000/api${e.photoUrl}`} alt={"catPhoto"}
                    />
                </div>)}
                {

                }
            </div>
            <div className={classes.name}>{`${breed.slice(0, 26)}${(breed.length > 26) ? "..." : ""}`}</div>
        </Link>
    );
}

export default OneFolder;