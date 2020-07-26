import React from "react";
import classes from "./Folders.module.css"
import OneFolder from "./OneFolder/OneFolder"
import ButtonTemplate from "../../Button/ButtonTemplate";

function Folders(props: any) {
    return (
        <div className={classes.blocksPink} >
            <div className={classes.name}>Folders:</div>
            <div className={classes.folders}>
                <OneFolder />
                <div className={classes.button}>
                    <ButtonTemplate name="Add folder" type="light" to="#s" />
                </div>
            </div>
        </div>
    );
}

export default Folders;