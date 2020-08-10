import React, {useEffect, useMemo, useState} from "react";
import classes from "./Profile.module.css"
import Folders from "./Folders/Folders";
import UserInfo from "./UserInfo/UserInfo";
import IdentifyBreed from "./IdentifyBreed/IdentifyBreed";
import Settings from "./Settings/Settings";
import {useParams} from "react-router";
import {useUser} from "../../context";
import Loader from "../Loader/Loader";
import ServerError from "../ServerError/ServerError";
import {User} from "../../store/AuthStore/types";
import {useStores} from "../../store/store";
import useAxios from "axios-hooks";
import Button from "../Button/Button";

function Profile() {
    const params = useParams<{ id: string }>();
    const myUser = useUser();
    const isOwn = useMemo(() => {
        return (params.id === myUser.id.toString());
    }, [params.id, myUser.id]);
    const {authStore} = useStores();
    const {updateUser, signOut} = authStore;

    const [user, setUser] = useState<User | undefined>(isOwn ? myUser : undefined);

    // data loading (user)
    const [{data, loading, error}] = useAxios<User>({url: `/users/${params.id}`}, {manual: isOwn});
    // const {result, loading, error} = useAsync(useCallback(() => Axios.get<User>(`/users/${params.id}`), [params.id]));

    useEffect(() => {
        if (isOwn) {
            setUser(myUser);
        } else {
            setUser(data);
        }
    }, [data, isOwn, myUser]);

    if (user === undefined && loading) return <Loader/>;
    if (user === undefined && error) return <ServerError message={error?.message ?? "undefined user"}/>;

    if (!user) return <div>Error</div>

    return (
        <div className={classes.profile}>
            <div className={classes.item}>
                <UserInfo
                    isOwn={isOwn}
                    user={user!}
                    refetchUser={updateUser}
                />
            </div>
            {isOwn && <>
                <div className={classes.item}>
                    <Settings email={user.email}/>
                </div>
                <Button type={"dark"} onClick={signOut}>Sign Out</Button>
                <div className={classes.item}>
                    <IdentifyBreed userId={user.id}/>
                </div>
            </>}

            <div className={classes.item}>
                <Folders userId={user.id}/>
            </div>
        </div>
    );
}

export default Profile;
