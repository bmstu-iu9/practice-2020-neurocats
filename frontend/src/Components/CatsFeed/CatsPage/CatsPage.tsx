import classes from "./CatsPage.module.css";
import React, {ReactElement, useMemo} from "react";
import CatCard from "../CatCard/CatCard";
import EmptyCatCard from "../CatCard/EmptyCatCard";

interface Props {
    catsId: string[];
}

function CatsPage({catsId}: Props) {

    const content = useMemo(() => {
        const res: ReactElement[] = [];
        for (let row = 0; row < 3; row++) {
            let rowCards: ReactElement[] = [];
            for (let card = row * 5; card < row * 5 + 5; card++) {
                if (catsId.length >= card) {
                    rowCards.push(<CatCard key={card} catId={catsId[card]}/>)
                } else {
                    rowCards.push(<EmptyCatCard key={card}/>);
                }
            }
            res.push(
                <div key={row} className={classes.row}>
                    {rowCards}
                </div>
            );
        }
        return res;
    }, [catsId]);

    return (
        <div className={classes.container}>
            <div className={classes.border}>
                <div className={classes.feedBorder}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default CatsPage;