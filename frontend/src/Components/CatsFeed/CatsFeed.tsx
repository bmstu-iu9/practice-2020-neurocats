import React, {useEffect, useState} from "react";
import "./CatsFeed.css";
import CatCard from "./CatCard";
import Axios from "axios";
import {CatsPhoto} from "../../types";

function CatsFeed() {
    const [cats, setCats] = useState<CatsPhoto[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await Axios.get<CatsPhoto[]>("http://localhost:5000/cats");
                console.log(res);
                setCats(res.data.slice(0, 15));
            } catch (e) {
                console.log("Some server error:", e);
            }
        })();
    }, []);

    if (cats.length === 0) return <h2>Sorry, no cats</h2>;

    //TODO rewrite this
    return (
        <div className={"CatsFeed_Container"}>
            <div className={"FeedBorder"}>
                <div className={"CatsFeed_Border"}>
                    <div className={"CatsFeed_Row"}>
                        <CatCard cat={cats[0] ?? undefined}/>
                        <CatCard cat={cats[1] ?? undefined}/>
                        <CatCard cat={cats[2] ?? undefined}/>
                        <CatCard cat={cats[3] ?? undefined}/>
                        <CatCard cat={cats[4] ?? undefined}/>
                    </div>
                    <div className={"CatsFeed_Row"}>
                        <CatCard cat={cats[5] ?? undefined}/>
                        <CatCard cat={cats[6] ?? undefined}/>
                        <CatCard cat={cats[7] ?? undefined}/>
                        <CatCard cat={cats[8] ?? undefined}/>
                        <CatCard cat={cats[9] ?? undefined}/>
                    </div>
                    <div className={"CatsFeed_Row"}>
                        <CatCard cat={cats[10] ?? undefined}/>
                        <CatCard cat={cats[11] ?? undefined}/>
                        <CatCard cat={cats[12] ?? undefined}/>
                        <CatCard cat={cats[13] ?? undefined}/>
                        <CatCard cat={cats[14] ?? undefined}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatsFeed;