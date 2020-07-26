import React, { useState } from "react";
import classes from "./Settings.module.css"
import ButtonTemplate from "../../Button/ButtonTemplate";

function Settings(props: any) {
  const [editState, setEditState] = useState(false);
  const [address, setAddress] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  let changeEmail = () => {
    if (!(address === '')) {
      props.dispatch({ type: 'UPDATE_EMAIL', email: address });
    }
  }
  let changePassword = () => {
    if (!(password === '') && (oldPassword === props.state.user.password) && (password === repeatPass)) {
      props.dispatch({ type: 'UPDATE_PASSWORD', password: password });
    }
  }
  return (
    <div className={classes.content}>
      {
        editState ?
          (<div className={classes.block}>
            <div className={classes.name}>Settings</div>

            <div className={classes.item}>E-mail: {props.state.user.email}</div>
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

            <button className={classes.button1} onClick={() => { changeEmail(); changePassword(); }}>
              <ButtonTemplate name="Save" type="dark" to="#s" />
            </button>
            <button onClick={() => { setEditState(false); }}><i className="fa fa-times" /></button>
          </div>)
          :
          (<button className={classes.button2} onClick={() => { setEditState(true) }}>
            <div className={classes.name}>Settings</div>
          </button>)
      }
    </div>
  );
}

export default Settings;