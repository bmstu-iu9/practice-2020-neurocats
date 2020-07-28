import React from "react";
import classes from "./ServerError.module.css"

interface Props {
    message: string;
}

function ServerError({message} : Props){
    return(
        <div className={classes.content}>
            ServerError: {message}.
        </div>
    );
}

export default ServerError;