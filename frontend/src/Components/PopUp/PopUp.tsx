import React, {ReactElement, ReactNode, useCallback, useMemo, useRef, useState, MouseEvent} from "react";
import classes from "./PopUp.module.css"
import {useOutsideClick} from "../../helps/useOutsideClick";

interface Props {
    position?: "left" | "center" | "right";
    closeOnClick?: boolean;
    className: string,
    children: [ReactElement, ReactElement];
}

const defaultProps: Partial<Props> = {
    position: "center",
    closeOnClick: true,
};

function isPopupElement(el: ReactElement, trigger: boolean) {
    if (typeof el.type === "string") return false;
    if (Reflect.ownKeys(el.type).includes("name")) {
        if (trigger) return el.type.name === PopUpTrigger.name;
        else return el.type.name === PopUpContent.name;
    }
    return false;
}

function PopUp({ position, className, closeOnClick, children }: Props) {
    const [visibility, setVisibility] = useState(false);

    const [trigger, content] = useMemo(() => {
        if (isPopupElement(children[0], true) && isPopupElement(children[1], false))
            return [children[0], children[1]];
        else if (
            isPopupElement(children[0], false) &&
            isPopupElement(children[1], true)
        )
            return [children[1], children[0]];
        else throw new Error("Error in PopUp props");
    }, [children]);

    const triggerAction = useCallback(() => {
        setVisibility((prevState) => !prevState);
    }, []);

    const onClose = useCallback(() => {
        setVisibility((prevState) => (prevState ? false : prevState));
    }, []);

    const PopupContent = () => {
        const ref = useRef<HTMLDivElement>(null);
        useOutsideClick(ref, onClose);
        return (
            <div
                className={classes.popUpContent}
                ref={ref}
                onClick={(event: MouseEvent) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (closeOnClick) onClose();
                }}
            >
                {content}
            </div>
        );
    };

    return (
        <div className={`${classes.popUp} ${className}`} onClick={triggerAction} data-side={position}>
            {trigger}
            {visibility && <PopupContent />}
        </div>
    );
}

PopUp.defaultProps = defaultProps;

export function PopUpTrigger({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

export function PopUpContent({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

export default PopUp;