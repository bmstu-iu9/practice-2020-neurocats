import React, {useCallback} from "react";
import "./CatsFeed.css";
import Axios from "axios";
import {useAsync} from "../../helps/useAsync";
import Loader from "../Loader/Loader";
import ErrorFeed from "./CatsPage/ErrorFeed";
import CatsPage from "./CatsPage/CatsPage";

function CatsFeed() {

    // data loading (cats)
    const {result, loading, error} = useAsync(useCallback(
        () => Axios.get<string[]>(`/cats/${1}/list/${15}`), []));
    if (loading) return <Loader/>;
    if (!result || error || !result.data.length) return <div><ErrorFeed/></div>;

    const {data: cats} = result;

    return (
        <div>
            <div>
            </div>
            <CatsPage catsId={cats.slice(0, 15)}/>
        </div>
    )
}

export default CatsFeed;