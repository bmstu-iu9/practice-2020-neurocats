import React, {useState} from "react";
import classes from "./SearchForm.module.css";
import PopUp, {PopUpContent, PopUpTrigger} from "../../PopUp/PopUp";

interface Props {
    className?: string
}

const breeds = [
    "Abyssinian",
    "British Shorthair",
    "Burmese",
    "Cornish Rex",
    "Devon Rex",
    "Himalayan",
    "Maine Coon",
    "Manx",
    "Persian",
    "Russian Blue",
    "Scottish Fold",
    "Siamese",
    "Sphynx",
    "Turkish Angora",
    "Turkish Van"
];

function SearchForm({className}: Props) {

    const [searchText, setSearchText] = useState("");

    return (
        <>
            <PopUp className={`${classes.container} ${className}`}>
                <PopUpTrigger>
                    <>
                        <input className={classes.input} type="text" value={searchText} onChange={ev => setSearchText(ev.target.value)} placeholder="Search"/>
                        <button className={classes.btn}>
                            <i className="fas fa-search"/>
                        </button>
                    </>
                </PopUpTrigger>
                <PopUpContent>
                    <div className={`${classes.popup} ${className}`}>
                        {breeds.filter(el => el.search(new RegExp(searchText + "")) != -1).map((el, ind) =>
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