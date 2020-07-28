import React, {useCallback} from "react";
import "./CatsFeed.css";
import Axios from "axios";
import {CatsPhoto} from "../../types";
import {useAsync} from "../../helps/useAsync";
import Loader from "../Loader/Loader";
import ErrorFeed from "./ErrorFeed";
import CatCard from "./CatCard";
import EmptyCatCard from "./EmptyCatCard";

function CatsFeed() {

    // data loading (cats)
    const {result, loading, error} = useAsync(useCallback(() => Axios.get<CatsPhoto[]>("/cats"), []));
    if (loading) return <Loader/>;
    // TODO insert <Error msg={error}/>
    if (result === undefined || error) return <div><span>Error: {error}</span><ErrorFeed/></div>;

    const {data: cats} = result;
    if (cats.length === 0) return <ErrorFeed/>;

    //TODO rewrite this
    return (
        <div className={"CatsFeed_Container"}>
            <div className={"FeedBorder"}>
                <div className={"CatsFeed_Border"}>
                    <div className={"CatsFeed_Row"}>
                        <CatCard cat={cats[0]}/>
                        {cats.length > 1 ? <CatCard cat={cats[1]}/> : <EmptyCatCard/>}
                        {cats.length > 2 ? <CatCard cat={cats[2]}/> : <EmptyCatCard/>}
                        {cats.length > 3 ? <CatCard cat={cats[3]}/> : <EmptyCatCard/>}
                        {cats.length > 4 ? <CatCard cat={cats[4]}/> : <EmptyCatCard/>}

                    </div>
                    <div className={"CatsFeed_Row"}>
                        {cats.length > 5 ? <CatCard cat={cats[5]}/> : <EmptyCatCard/>}
                        {cats.length > 6 ? <CatCard cat={cats[6]}/> : <EmptyCatCard/>}
                        {cats.length > 7 ? <CatCard cat={cats[7]}/> : <EmptyCatCard/>}
                        {cats.length > 8 ? <CatCard cat={cats[8]}/> : <EmptyCatCard/>}
                        {cats.length > 9 ? <CatCard cat={cats[9]}/> : <EmptyCatCard/>}
                    </div>
                    <div className={"CatsFeed_Row"}>
                        {cats.length > 10 ? <CatCard cat={cats[10]}/> : <EmptyCatCard/>}
                        {cats.length > 11 ? <CatCard cat={cats[11]}/> : <EmptyCatCard/>}
                        {cats.length > 12 ? <CatCard cat={cats[12]}/> : <EmptyCatCard/>}
                        {cats.length > 13 ? <CatCard cat={cats[13]}/> : <EmptyCatCard/>}
                        {cats.length > 14 ? <CatCard cat={cats[14]}/> : <EmptyCatCard/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatsFeed;