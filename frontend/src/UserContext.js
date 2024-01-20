import { createContext, useContext, useEffect, useState} from "react";
import { makeRequest } from "./utils/requestHelpers";
import {GlobalLoadingContext } from "./GlobalLoading";

export const UserContext = createContext({});
export function UserProvider({children}) {
    const [userInfo, setUserInfo] = useState(null);
    const {globalLoading, setGlobalLoading} = useContext(GlobalLoadingContext);
    useEffect(() => {
        makeRequest('GET', 'USER_PROFILE', {}, {}, {credentials: 'include'})
        .then((response) => {
            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setGlobalLoading({...globalLoading, userContextLoading: true});
                });
            }
        })
    }, [])
    return (<UserContext.Provider value={{userInfo, setUserInfo}}>
        {children}
    </UserContext.Provider>)
}