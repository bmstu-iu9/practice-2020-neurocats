import React from "react";
import classes from "./ErrorFeed.module.css";

function CatsFeed() {

    return (
        <div className={classes.CatsFeed_Container}>
            <div className={classes.FeedBorder}>
                <div className={classes.item}>Sorry, there are no cats here. We took them to comb their hair.</div>
            </div>
        </div>
    )
}

export default CatsFeed;