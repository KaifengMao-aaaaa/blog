import { createContext, useContext, useState } from "react";
export const postStructure = {
    post_id: undefined,
    title: '',
    banner: '',
    conent: [],
    tags: [],
    content: '',
    isDraft: true,
    des: '',
    author: undefined,
}
export const EditPageContext = createContext({});
export function EditPageContextProvider({children}) {
    const [wholeQuery, setWholeQuery] = useState({})
    const [post, setPost] = useState(postStructure);
    return (<EditPageContext.Provider value={{wholeQuery, setWholeQuery, post, setPost}}>
        {children}
    </EditPageContext.Provider>)
}