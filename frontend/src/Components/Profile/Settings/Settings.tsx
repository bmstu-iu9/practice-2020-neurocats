import React, {useCallback, useState} from "react";
import classes from "./Settings.module.css"
import ButtonTemplate from "../../Button/ButtonTemplate";
import {useUser} from "../../../context";

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
      //TODO with auth

      // try {
      //   await Axios.patch(`/users/${myUser.id}`, {
      //     email: address,
      //     password: oldPassword,
      //     newPassword: password
      //   });
      // } catch (e) {
      //   console.log(e);
      // }
      setEditState(false);
    }
  }, [address, password, oldPassword, repeatPass, setEditState, myUser.id]);

  return (
    <div className={classes.content}>
      {
        editState ?
          (<div className={classes.block}>
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
              <button className={classes.button1} onClick={() => saveChanges}>
                <ButtonTemplate name="Save" type="dark" to="#s"/>
              </button>
              <button className={classes.button2} onClick={() => {
                setEditState(false);
              }}>
                <ButtonTemplate name="Close" type="dark" to="#s"/>
              </button>
            </div>
          </div>)
          :
          (<button className={classes.button3} onClick={() => { setEditState(true) }}>
            <div className={classes.name}>Settings</div>
          </button>
          )
      }
    </div>
  );
}

export default Settings;