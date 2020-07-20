import React, { useState } from "react";
import classes from "./UserInfo.module.css"
import "./UserInfo.css"

function UserInfo(props: any) {

  // to example
  let someCondition = false;

  // do condition for our edit
  const [editState, setEditState] = useState(false);

    return (
        <div className={classes.UserInfo}>
          { // here you can write normal code (not hooks!)
            editState ?
              // edit fields
              <>
                <button onClick={() => {setEditState(true)}}>Save</button>
              </>
            :
              // usual fields
              <>
                <img src={props.user.photoUrl} alt="ava" />
                <div className={classes.name}>@{props.user.name}</div>
                <button onClick={() => {setEditState(false)}}>Edit</button>
              </>
          }

          {
            // just example. Please delete after reading
            // you can add some div / react components / else html elements due to condition
            someCondition && <div/>
          }
        </div>
    );
}

export default UserInfo;
