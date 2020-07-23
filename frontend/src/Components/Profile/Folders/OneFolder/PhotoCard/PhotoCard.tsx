import React from "react";
import classes from "./PhotoCard.module.css"

function PhotoCard(props : any) {
    let isUrl = true;
    if (props.url === ""){
        isUrl = false;
    }
    return (
        <div>
            {
                isUrl ? (
                    <div className={classes.photo1}>
                        <img src={props.url} alt="pht" />
                    </div>
                ) : (
                    <div className={classes.photo2}>
                    </div>
                )
            }
        </div>

    );
}

export default PhotoCard;