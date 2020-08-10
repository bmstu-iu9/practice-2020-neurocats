import React, {useCallback, useState} from "react";
import classes from "./Settings.module.css"
import {useUser} from "../../../context";
import Button from "../../Button/Button";
import Axios from "axios";

interface Props {
  email: string,
}


function Settings({email}: Props) {
  const myUser = useUser();

  const [editState, setEditState] = useState(false);
  const [address, setAddress] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const saveChanges = useCallback(async () => {
    if (password === repeatPass) {
      try {
        await Axios.patch(`/users/${myUser.id}`, {
          email: address,
          password: password,
        });
      } catch (e) {
        console.log(e);
      }
      setEditState(false);
    }
  }, [address, password, oldPassword, repeatPass, setEditState, myUser.id]);

  return (
    <div className={classes.content}>
      {
        editState ?
          <div className={classes.block}>
            <div>Settings</div>

            <div className={classes.item}>E-mail: {email}</div>
            <div>
              <div className={classes.item}>Enter new address:</div>
              <input type="text" className={classes.field} onChange={e => setAddress(e.target.value)} />
            </div>

            <div>
              <div className={classes.item}>Enter old password:</div>
              <input type="password" className={classes.field} onChange={e => setOldPassword(e.target.value)} />
            </div>
            <div>
              <div className={classes.item}>Enter new password:</div>
              <input type="password" className={classes.field} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <div className={classes.item}>Repeat new password:</div>
              <input type="password" className={classes.field} onChange={e => setRepeatPass(e.target.value)} />
            </div>

            <div className={classes.buttons}>
              <Button type={"dark"} onClick={saveChanges}>Save</Button>
              <Button type={"dark"} onClick={() => setEditState(false)}>Close</Button>
            </div>
          </div>
          :
            <Button type={"dark"} onClick={() => setEditState(true)}>Settings</Button>
      }
    </div>
  );
}

export default Settings;