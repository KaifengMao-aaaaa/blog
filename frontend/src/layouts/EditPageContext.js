import { createContext, useState } from "react";
const blogStructure = {
    id: null,
    title: '',
    banner: '',
    conent: [],
    tags: [],
    content: '',
    isDraft: true,
    des: '',
    author: null
}
export const EditPageContext = createContext({});
export function EditPageContextProvider({children}) {
    const [editState, setEditState] = useState('Edit');
    const [blog, setBlog] = useState(blogStructure);
    return (<EditPageContext.Provider value={{editState, setEditState, blog, setBlog}}>
        {children}
    </EditPageContext.Provider>)
}