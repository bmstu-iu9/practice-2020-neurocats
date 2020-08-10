import {RefObject, useCallback, useEffect} from "react";

export function useOutsideClick(wrapper: RefObject<any>, handler: () => void) {
    const handleOutsideClick = useCallback(
        (ev: MouseEvent) => {
            if (wrapper.current && !wrapper.current.contains(ev.target as Node)) {
                handler();
            }
        },
        [wrapper, handler],
    );
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [handleOutsideClick]);
}