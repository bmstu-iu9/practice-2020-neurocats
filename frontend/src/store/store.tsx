import React, {FC, useContext} from "react";
import {AuthStore} from "./AuthStore/AuthStore";
import Axios from "axios";

if (process.env.NODE_ENV !== "production") {
    Axios.defaults.baseURL = "http://localhost:5000/api";
} else {
    Axios.defaults.baseURL = `http://${window.location.host}/api`;
}

const stores = {
    authStore: new AuthStore()
};

const StoresContext = React.createContext(stores);

export const StoresProvider: FC = ({children}) => <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>;

export function useStores() {
    const stores = useContext(StoresContext);

    if (!stores) throw new Error("Store must be provided in top of application")

    return stores;
}