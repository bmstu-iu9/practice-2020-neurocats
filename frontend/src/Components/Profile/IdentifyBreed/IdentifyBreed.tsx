import React, {useCallback} from "react";
import classes from "./IdentifyBreed.module.css"
import Axios from "axios";
import Button from "../../Button/Button";

interface Props {
    userId: number
}

function IdentifyBreed({userId} : Props) {

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
    }, []);

    return (
        <div className={classes.contentPink}>
            <div className={classes.name}>Identify the breed</div>
            <Button type={"light"} onClick={uploadPhoto}>Add photo</Button>
        </div>
    );
}

export default IdentifyBreed;