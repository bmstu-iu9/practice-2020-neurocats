import React, {useCallback, useMemo} from "react";
import classes from "./Profile.module.css"
import Folders from "./Folders/Folders";
import UserInfo from "./UserInfo/UserInfo";
import IdentifyBreed from "./IdentifyBreed/IdentifyBreed";
import Settings from "./Settings/Settings";
import {useParams} from "react-router";
import Axios from "axios";
import {User} from "../../types";
import {useUser} from "../../context";
import {useAsync} from "../../helps/useAsync";
import Loader from "../Loader/Loader";

function Profile() {
    const params = useParams<{ id: string }>();
    const myUser = useUser();
    const isOwn = useMemo(() => {
        return (params.id === myUser.id.toString());
    }, [params.id, myUser.id])

    // data loading (user)
    const {result, loading, error, refetch} = useAsync(useCallback(() => Axios.get<User>(`/users/${params.id}`), [params.id]));
    if (result === undefined && loading) return <Loader/>;
    // TODO insert <Error msg={error}/>
    if (result === undefined || error) return <div><span>Error: {error}</span></div>;

    const {data: user} = result;
    if (!user) return <div>Error</div>

    return (
        <div className={classes.profile}>
            <div className={classes.item}>
                <UserInfo
                    isOwn={isOwn}
                    user={user!}
                    refetchUser={refetch}
                />
            </div>
            <div className={classes.item}>
                <Folders
                    userId={user.id}
                    userCats={user.userCatsPhotoUrl}
                />
            </div>
            <div className={classes.item}>
                <IdentifyBreed id={user.id}/>
            </div>

            { isOwn &&
            <div className={classes.item}>
                <Settings pass={user.password} email={user.email}/>
            </div>
            }
        </div>
    );
}

export default Profile;
