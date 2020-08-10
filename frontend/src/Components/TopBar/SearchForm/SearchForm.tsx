import React, {useCallback, useState} from "react";
import classes from "./SearchForm.module.css";
import PopUp, {PopUpContent, PopUpTrigger} from "../../PopUp/PopUp";
import {useHistory} from "react-router";

interface Props {
    className?: string
}

const breeds = [
    "Abyssinian",
    "American Bobtail",
    "American Shorthair",
    "Applehead Siamese",
    "Balinese",
    "Bengal",
    "Birman",
    "Bombay",
    "British Shorthair",
    "Burmese",
    "Calico",
    "Chartreux",
    "Cornish Rex",
    "Devon Rex",
    "Dilute Calico",
    "Dilute Tortoiseshell",
    "Domestic Long Hair",
    "Domestic Medium Hair",
    "Domestic Short Hair",
    "Egyptian Mau",
    "Exotic Shorthair",
    "Extra-Toes Cat - Hemingway Polydactyl",
    "Havana",
    "Himalayan",
    "Korat",
    "Maine Coon",
    "Manx",
    "Munchkin",
    "Nebelung",
    "Norwegian Forest Cat",
    "Ocicat",
    "Oriental Short Hair",
    "Oriental Tabby",
    "Persian",
    "Pixiebob",
    "Ragamuffin",
    "Ragdoll",
    "Russian Blue",
    "Scottish Fold",
    "Selkirk Rex",
    "Siamese",
    "Siberian",
    "Snowshoe",
    "Sphynx - Hairless Cat",
    "Tabby",
    "Tiger",
    "Tonkinese",
    "Torbie",
    "Tortoiseshell",
    "Turkish Angora",
    "Turkish Van",
    "Tuxedo",
];

function SearchForm({className}: Props) {
    const history = useHistory();

    const [searchText, setSearchText] = useState("");

    const search = useCallback(() => {
        let res = searchText;
        setSearchText("");
        if (breeds.findIndex(el => (el === res)) !== -1)
            return history.push(`/breed/${res}`);
        else
            return history.push(`/breed`);
    }, [searchText, history, setSearchText]);

    return (
        <>
            <PopUp className={`${classes.container} ${className}`}>
                <PopUpTrigger>
                    <>
                        <input className={classes.input} type="text" value={searchText} onChange={ev => setSearchText(ev.target.value)} placeholder="Search"/>
                        <button className={classes.btn} onClick={search}>
                            <i className="fas fa-search"/>
                        </button>
                    </>
                </PopUpTrigger>
                <PopUpContent>
                    <div className={`${classes.popup} ${className}`}>
                        {breeds.filter(el => el.search(new RegExp(searchText + "")) !== -1).map((el, ind) =>
                            <div key={ind} className={classes.chip} onClick={() => {setSearchText(el)}}>
                                <span>{el}</span>
                            </div>
                        )}
                    </div>
                </PopUpContent>
            </PopUp>
        </>
    );
}

export default SearchForm;