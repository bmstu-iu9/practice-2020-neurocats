import React, {useCallback} from "react";
import classes from "./IdentifyBreed.module.css"
import ButtonTemplate from "../../Button/ButtonTemplate";
import Axios from "axios";
import {useUser} from "../../../context";

interface Props {
    id: number
}

function IdentifyBreed({id} : Props) {
    const myUser = useUser();

    const uploadPhoto = useCallback(() => {
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
                await Axios.post(`/cats`, form);
            } catch (e) {
                console.log(e);
            }
            document.body.removeChild(input);
        };
    }, [myUser]);

    return (
        <div className={classes.contentPink}>
            <div className={classes.name}>Identify the breed</div>
            <button className={classes.button1} onClick={uploadPhoto}>
                <ButtonTemplate name="Add photo" type="light" to="#s" />
            </button>
        </div>
    );
}

export default IdentifyBreed;