import React, {useCallback} from "react";
import classes from "./Folders.module.css"
import OneFolder from "./OneFolder/OneFolder"
import {useAsync} from "../../../helps/useAsync";
import Axios from "axios";
import Loader from "../../Loader/Loader";
import ServerError from "../../ServerError/ServerError";

interface Props {
    userId: number,
    userCats: number[]
}

function Folders({userId, userCats}: Props) {

    // data loading (userFolders)
    const {result, loading, error} = useAsync(useCallback(() => Axios.get<string[]>(`/users/${userId}/folder`), [userId]));
    if (result === undefined && loading) return <Loader/>;
    if (result === undefined || error) return <ServerError message={error?.message ?? "undefined folders"}/>;

    const {data: folders} = result;

    return (
        <div className={classes.blocksPink} >
            <div className={classes.name}>Folders:</div>
            <div className={classes.folders}>
                {folders.map((el, ind) => <OneFolder key={ind} id={userId} breed={el}/>)}
            </div>
        </div>
    );
}

export default Folders;