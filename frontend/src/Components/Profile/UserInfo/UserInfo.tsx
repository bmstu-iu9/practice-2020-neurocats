import React, {useCallback, useState} from "react";
import classes from "./UserInfo.module.css"

interface Props {
    id: number,
    name: string,
    photoUrl: string,
}

function UserInfo({id, name, photoUrl}: Props) {
    const [editState, setEditState] = useState(false);
    const [newName, setNewName] = useState('');

    let changeName = () => {
        if (!(name === '')){
            //TODO
        }
    }

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
            const blob = new Blob([file], {type: file.type});
            // await userProvider.uploadPhoto(id, file.name, blob);
            document.body.removeChild(input);
        };
    }, [id]);

    return (
        <div className={classes.UserInfo}>
            <div className={classes.ava}>
                <img
                    className={`${photoUrl ? "" : classes.empty}`}
                    src={`http://localhost:5000${photoUrl}`} alt={"ava"}
                />
                <div className={classes.avaEdit} onClick={changeAvatar}>
                    <span>Изменить</span>
                </div>
            </div>
            <div className={classes.block}>
                {editState ?
                    <>
                        <input type="text" className={`${classes.nameChangeField} ${classes.edit}`} value={name} onChange={e => setNewName(e.target.value)}/>
                        <button className={classes.button1}
                                onClick={() => { setEditState(false); changeName(); }}>
                            <div className={classes.save}>Save</div>
                        </button>
                    </>
                    :
                    <>
                        <div className={classes.name}>@{name}</div>
                        <button className={classes.button2} onClick={() => { setEditState(true) }}>
                            <i className="fa fa-edit"/>
                        </button>
                    </>
                }
            </div>
        </div>
    );
}

export default UserInfo;
