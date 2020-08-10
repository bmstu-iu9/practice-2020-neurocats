import React, {useContext} from "react";
import {User} from "./store/AuthStore/types";

const UserContext = React.createContext<User>({} as User);
export const UserProvider = UserContext.Provider;

export const useUser = () => useContext(UserContext);
