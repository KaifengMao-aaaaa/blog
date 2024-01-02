import { createContext, useState} from "react";

export const GlobalLoadingContext = createContext({});
export function GlobalLoadingProvider({children}) {
    const [userContextLoading, setUserContextLoading] = useState(false);
    const [editContextLoading, setEditContextLoading] = useState(false);
    const [globalLoading, setGlobalLoading] = useState({userContextLoading, editContextLoading});
    return (<GlobalLoadingContext.Provider value={{globalLoading, setGlobalLoading}}>
        {children}
    </GlobalLoadingContext.Provider>)
}