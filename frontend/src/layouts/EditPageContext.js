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
    category: null
}
export const EditPageContext = createContext({});
export function EditPageContextProvider({children}) {
    const [wholeQuery, setWholeQuery] = useState({})
    const [post, setPost] = useState(localStorage.getItem('post') ? JSON.parse(localStorage.getItem('post')) : postStructure);
    const [isOpenDrafts, setIsOpenDrafts] = useState(false);
    return (<EditPageContext.Provider value={{wholeQuery, setWholeQuery, post, setPost, isOpenDrafts, setIsOpenDrafts}}>
        {children}
    </EditPageContext.Provider>)
}