import React, {useCallback, useState} from "react";
import classes from "./UserInfo.module.css"
import Axios from "axios";
import {User} from "../../../types";

interface Props {
    isOwn: boolean
    user: User,
    refetchUser: () => void
}

function UserInfo({isOwn, user, refetchUser}: Props) {
    const [editState, setEditState] = useState(false);
    const [newName, setNewName] = useState(user.name);

    const changeName = useCallback(async () => {
        if (newName !== '') {
            try {
                await Axios.patch(`/users/${user.id}`, {
                    name: newName,
                });
                await refetchUser();
            } catch (e) {
                console.log(e);
            }
        }
    }, [refetchUser, newName, user.id]);

    const changeAvatar = useCallback(() => {
        const input: HTMLInputElement = document.createElement("input");
        input.type = "file";
        input.style.display = "none";
        input.accept = "image/*";
        document.body.appendChild(input);

        input.click();
        input.onchange = async () => {
            const file = input.files?.item(0);
            if (!file) return;
            const form = new FormData();
            form.append("file", file);
            try {
                await Axios.post(`/users/${user.id}/photo`, form);
                await refetchUser();
            } catch (e) {
                console.log(e);
            }
            document.body.removeChild(input);
        };
    }, [user.id, refetchUser]);


    return (
        <div className={classes.UserInfo}>
            <div className={classes.ava}>
                <img
                    className={`${user.photoUrl ? "" : classes.empty}`}
                    src={`http://localhost:5000/api${user.photoUrl}`} alt={"ava"}
                />
                {isOwn &&
                    <div className={classes.avaEdit} onClick={changeAvatar}>
                        <span>Изменить</span>
                    </div>
                }
            </div>
            <div className={classes.block}>
                {editState ?
                    <>
                        <input
                            type="text"
                            className={`${classes.nameChangeField} ${classes.edit}`}
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                        />
                        <button className={classes.button1}
                                onClick={() => { setEditState(false); changeName(); }}>
                            <div className={classes.save}>Save</div>
                        </button>
                    </>
                    :
                    <>
                        <div className={classes.name}>@{user.name}</div>
                        {isOwn &&
                            <button className={classes.button2} onClick={() => { setEditState(true) }}>
                                <i className="fa fa-edit"/>
                            </button>
                        }
                    </>
                }
            </div>
        </div>
    );
}

export default UserInfo;
