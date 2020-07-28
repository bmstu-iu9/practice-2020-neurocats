import React, {useCallback} from "react";
import "./CatsFeed.css";
import Axios from "axios";
import {CatsPhoto} from "../../types";
import {useAsync} from "../../helps/useAsync";
import Loader from "../Loader/Loader";
import ErrorFeed from "./ErrorFeed";
import CatCard from "./CatCard";
import EmptyCatCard from "./EmptyCatCard";
import ServerError from "../ServerError/ServerError";

function CatsFeed() {

    // data loading (cats)
    const {result, loading, error, refetch} = useAsync(useCallback(() => Axios.get<CatsPhoto[]>("/cats"), []));
    if (loading) return <Loader/>;
    if (result === undefined || error) return <div><ServerError message={error?.message ?? "undefined cats"}/><ErrorFeed/></div>;

    const {data: cats} = result;
    if (cats.length === 0) return <ErrorFeed/>;

    if (cats.length !== 15){
        while (cats.length !== 15) {
            cats.push({id: 0, photoUrl: "", breed: "", owner: 0, likes:[]});
        }
    }
    let cats1 = cats.slice(1,5);
    let cats2 = cats.slice(5, 10);
    let cats3 = cats.slice(10);

    return (
        <div className={"CatsFeed_Container"}>
            <div className={"FeedBorder"}>
                <div className={"CatsFeed_Border"}>
                    <div className={"CatsFeed_Row"}>
                        <CatCard cat={cats[0]} refetchCats={refetch}/>
                        {cats1.map(e => e.id !== 0 ? <CatCard cat={e} refetchCats={refetch}/> : <EmptyCatCard/>)}
                    </div>
                    <div className={"CatsFeed_Row"}>
                        {cats2.map(e => e.id !== 0 ? <CatCard cat={e} refetchCats={refetch}/> : <EmptyCatCard/>)}
                    </div>
                    <div className={"CatsFeed_Row"}>
                        {cats3.map(e => e.id !== 0 ? <CatCard cat={e} refetchCats={refetch}/> : <EmptyCatCard/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatsFeed;