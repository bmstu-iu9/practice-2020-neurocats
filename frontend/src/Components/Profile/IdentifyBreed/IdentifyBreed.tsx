import React, {useCallback, useMemo, useState} from "react";
import classes from "./IdentifyBreed.module.css"
import Axios from "axios";
import Button from "../../Button/Button";
import CatCard from "../../CatCard/CatCard";
import EmptyCatCard from "../../CatCard/EmptyCatCard";
import useAxios from "axios-hooks";
import {CatsPhoto} from "../../../types";
import Loader from "../../Loader/Loader";

interface Props {
    userId: number;
}

function IdentifyBreed({userId} : Props) {

    const [resCard, setResCard] = useState(0);

    // data loading (user)
    const [{data: cat, loading, error}] = useAxios<CatsPhoto>({url: `/cat/${resCard}`}, {manual: !resCard});

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
                let res = await Axios.post(`/cat/${userId}`, form);
                console.log(res.data.id);
                setResCard(res.data.id);
            } catch (e) {
                setResCard(0);
                console.log(e);
            }
            document.body.removeChild(input);
        };
    }, [userId, setResCard]);

    const card = useMemo(() => {
        if (resCard) {
            if (loading)
                return <Loader/>
            else if (!error && cat) {
                return <CatCard cat={cat}/>
            }
        }
        return <EmptyCatCard/>
    }, [resCard, loading, error, cat]);

    return (
        <div className={classes.contentPink}>
            <div className={classes.controls}>
                <div className={classes.name}>Identify the breed</div>
                <Button type={"light"} onClick={uploadPhoto}>Add photo</Button>
            </div>
            {card}
        </div>
    );
}

export default IdentifyBreed;