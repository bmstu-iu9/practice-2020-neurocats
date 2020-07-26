import React from "react";
import classes from "./Folders.module.css"
import OneFolder from "./OneFolder/OneFolder"
import ButtonTemplate from "../../Button/ButtonTemplate";

interface Props {
    userId: number,
    userCats: number[]
}

function Folders({userId, userCats}: Props) {
    return (
        <div className={classes.blocksPink} >
            <div className={classes.name}>Folders:</div>
            <div className={classes.folders}>
                <OneFolder id={userId}/>
                <div className={classes.button}>
                    <ButtonTemplate name="Add folder" type="light" to="#s" />
                </div>
            </div>
        </div>
    );
}

export default Folders;