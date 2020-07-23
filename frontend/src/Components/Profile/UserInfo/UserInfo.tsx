import React, { useState } from "react";
import classes from "./UserInfo.module.css"

function UserInfo(props: any) {
  const [editState, setEditState] = useState(false);
  const [name, setName] = useState('');
  let changeName = () => {
    if (!(name === '')){
      props.dispatch({type: 'UPDATE_NAME', username: name});
    }
  }
  return (
    <div className={classes.UserInfo}>
      <img src={props.state.user.photoUrl} alt="ava" />
      <div className={classes.name}>@{props.state.user.name}</div>
      <div className={classes.edit}>
      { 
        editState ?
          <div className={classes.block}>
            <button className={classes.button1} 
            onClick={() => { setEditState(false); changeName(); }}>
              <div className={classes.save}>Save</div></button>
            <input type="text" className={classes.nameChangeField} onChange={e => setName(e.target.value)}/>
          </div>
          :
          <div className={classes.block}>
            <button className={classes.button2} onClick={() => { setEditState(true) }}><i className="fa fa-edit"/></button>
          </div>
      }
      </div>
    </div>
  );
}

export default UserInfo;
