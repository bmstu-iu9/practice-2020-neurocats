import React, {useEffect, useMemo, useState} from "react";
import classes from "./Profile.module.css"
import Folders from "./Folders/Folders";
import UserInfo from "./UserInfo/UserInfo";
import IdentifyBreed from "./IdentifyBreed/IdentifyBreed";
import Settings from "./Settings/Settings";
import {useHistory, useParams} from "react-router";
import Axios, {AxiosError} from "axios";
import {User} from "../../types";
import {useUser} from "../../context";

function Profile() {
    const params = useParams<{ id: string }>();
    const history = useHistory();
    const myUser = useUser();
    const isOwn = useMemo(() => {return(params.id === myUser.id.toString());},[])

    const [user, setUser] = useState<User>();
    useEffect(() => {
        (async () => {
            try {
                const {data} = await Axios.get(`/users/${params.id}`);
                setUser(data)
            } catch (e) {
                if (e.isAxiosError) {
                    const err = e as AxiosError;
                    if (err.response?.status === 404) {
                        history.push("/404");
                    }
                }
                console.log("Some server error:", e);
            }
        })();
    }, [setUser, params]);

    if (!user) return <div>Error</div>

    return (
        <div className={classes.profile}>
            <div className={classes.item}>
                <UserInfo
                    id={user!.id}
                    name={user!.name}
                    photoUrl={user!.photoUrl}/>
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
