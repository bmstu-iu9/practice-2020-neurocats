import CatsPage from "../CatsPage/CatsPage";
import React, {useCallback, useState} from "react";
import {useAsync} from "../../helps/useAsync";
import Axios from "axios";
import Loader from "../Loader/Loader";
import ErrorFeed from "../CatsPage/ErrorFeed";
import {useParams} from "react-router";
import {CatsPhoto} from "../../types";
import classes from "./FolderFeed.module.css";
import Button from "../Button/Button";

function FolderFeed() {
    const params = useParams<{ id: string, breed: string }>();
    const [page, setPage] = useState(0);

    // data loading (cats)
    const {result, loading, error} = useAsync(useCallback(
        () => Axios.get<CatsPhoto[]>(`/users/${params.id}/cats/${params.breed}`, {
            params: {
                offset: (page * 15),
                limit: 15
            }
        }), [params, page]));

    if (loading) return <Loader/>;
    if (!result || error || !result.data.length) return <div><ErrorFeed/></div>;

    const {data: cats} = result;

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.name}>
                    <span>{params.id}</span>
                    <span> > </span>
                    <span>{params.breed}</span>
                </div>
                <div className={classes.controls}>
                    <Button type={"dark"} onClick={() => setPage((page > 0 ? page - 1 : 0))}>
                        <i className="fas fa-arrow-left"/>
                    </Button>
                    <div className={classes.page}>{page + 1}</div>
                    <Button type={"dark"} onClick={() => setPage(page + 1)}>
                        <i className="fas fa-arrow-right"/>
                    </Button>
                </div>
            </div>
            <CatsPage cats={cats.slice(0, 15)}/>
        </div>
    )
}

export default FolderFeed;