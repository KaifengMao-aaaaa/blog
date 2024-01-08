import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext"
import { Navigate, useParams } from "react-router-dom";
import Edit from "./Display/Edit";
import styles from './Css/editPage.module.css'
import Preview from "./Display/Preview";
import Publish from "./Display/Publish";
import { GlobalLoadingContext } from "../../GlobalLoading";
import Loading from "../../components/Loading/Loading";
import { makeRequest } from "../../utils/requestHelpers";
import Draft from "./Display/Draft";
import { defaultSolveException } from "../../utils/helpers";
import { EditPageContext } from "../../layouts/EditPageContext";
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
export const EditContext = createContext({});
export function EditPage() {
    const {userInfo} = useContext(UserContext);
    const {globalLoading, setGlobalLoading} = useContext(GlobalLoadingContext);
    const {editState, setEditState, blog, setBlog} = useContext(EditPageContext)
    // const [editState, setEditState] = useState('Edit');
    // const [blog, setBlog] = useState(blogStructure);
    const {postId} = useParams();
    useEffect(() => {
        if (postId) {
            localStorage.setItem('postId', postId);
        }
        if (globalLoading.userContextLoading) {
            window.addEventListener('beforeunload', handleBeforeUnload);
            const postId = localStorage.getItem('postId')
            if (postId) {
                makeRequest('GET','POST_GETONE',  {postId: localStorage.getItem('postId')}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                    .then(response => {
                        if (response.ok) {
                            response.json().then(result => setBlog(result.post))
                        } else {
                            defaultSolveException(response);
                        }
                    })
            }
            if (localStorage.getItem('editState')) {
                setEditState(localStorage.getItem('editState'));
                localStorage.removeItem('editState');
            }
            setBlog({...blog, author: userInfo.userId});    
            setGlobalLoading({...globalLoading, editContextLoading: true});
        };
        return () => {
            localStorage.removeItem('postId');
            localStorage.removeItem('editState')
        }
    }, [globalLoading.userContextLoading, editState])
    const handleBeforeUnload = (event) => {
        localStorage.setItem('editState', editState);
    };
    if (!globalLoading.userContextLoading) {
        return (<Loading/>)
    }
    if (userInfo === null) {
        return (<Navigate to = "/login"/>)
    }
    return (
        // <EditContext.Provider value={{blog, setBlog, editState, setEditState}}>
        <div >
            <div  id="EditPage-Container">
                {/* <Edit/> */}
                {/* <Preview/> */}
                <div >
                    {editState === 'Preview' && (<Preview/>)}
                    {editState === 'Edit' && (<Edit/>)}
                    {editState === 'Publish' && <Publish/>}
                    {/* {editState === 'Edit' && <div className={styles.BothContainer}><Preview/><div className={styles.divider} id="EditPage-divided"></div><Edit/></div>} */}
                    {/* {editState === 'DraftList' && <Draft/>} */}
                </div>
            </div>
        </div>
        // </EditContext.Provider>
    )
}