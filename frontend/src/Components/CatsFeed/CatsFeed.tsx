import React, { useEffect, useState } from "react";
import "./CatsFeed.css";
import CatCard from "./CatCard";
import Axios from "axios";

interface User {
    id: any,
    email: string,
    password: string,
    name: string,
    photoUrl: string,
    userCatsPhotoUrl: CatsPhoto[]
}

interface CatsPhoto {
    id: any,
    photoUrl: string,
    breed: any,
    owner: User,
    likes: User[]
}

function CatsFeed() {
    const [cats, setCats] = useState<CatsPhoto[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const res = await Axios.get<CatsPhoto[]>("/cats");
                setCats(res.data);
            } catch (e) {
                console.log("Some server error:", e);
            }
        })();
    }, []);

    //if (cats.length === 0) return <h2>No cats</h2>;

    return (
        <div className={"CatsFeed_Container"}>
            <div className={"FeedBorder"}>
                <div className={"CatsFeed_Border"}>
                    <div className={"CatsFeed_Row"}>
                        <CatCard />
                        <CatCard />
                        <CatCard />
                        <CatCard />
                        <CatCard />
                    </div>
                    <div className={"CatsFeed_Row"}>
                        <CatCard />
                        <CatCard />
                        <CatCard />
                        <CatCard />
                        <CatCard />
                    </div>
                    <div className={"CatsFeed_Row"}>
                        <CatCard />
                        <CatCard />
                        <CatCard />
                        <CatCard />
                        <CatCard />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CatsFeed;