import React from "react";
import "./CatsFeed.css";
import CatCard from "./CatCard";

function CatsFeed() {
    return (
        <div className={"CatsFeed_Container"}>
            <div className={"CatsFeed_Border"}>
                <div className={"CatsFeed_Row"}>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                </div>
                <div className={"CatsFeed_Row"}>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                </div>
                <div className={"CatsFeed_Row"}>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                    <CatCard/>
                </div>
            </div>
        </div>
    )
}

export default CatsFeed;