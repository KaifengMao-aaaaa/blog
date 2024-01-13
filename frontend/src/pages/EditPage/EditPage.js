import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Edit from "./Display/Edit";
import Preview from "./Display/Preview";
import Publish from "./Display/Publish";
import { GlobalLoadingContext } from "../../GlobalLoading";
import Loading from "../../components/Loading/Loading";
import { makeRequest } from "../../utils/requestHelpers";
import Main from "./Display/Main";
import { defaultSolveException } from "../../utils/helpers";
import { EditPageContext } from "../../layouts/EditPageContext";
export const EditContext = createContext({});
export function EditPage() {
    const {userInfo} = useContext(UserContext);
    const {globalLoading, setGlobalLoading} = useContext(GlobalLoadingContext);
    const {wholeQuery,setWholeQuery, post, setPost} = useContext(EditPageContext)
    let {query} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const post_id = query.split('post_id=')[1]?.split('+')[0];
        const editState = query.split('editState=')[1]?.split('+')[0];
        if (post_id === undefined || editState === undefined) {
            navigate('/');
        }
        setWholeQuery({
            editState, post_id
        })
        
        async function getPost(post_id) {
            if (localStorage.getItem('post')) {
                setPost(JSON.parse(localStorage.getItem('post')))
            } else if (post_id) {
                await makeRequest('GET','POST_GET',  {post_id, number: 1, offset: 0}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                    .then(response => {
                        if (response.ok) {
                            response.json().then(result => result.posts.length !== 0 ? setPost(result.posts[0]) : '')
                        } else {
                            defaultSolveException(response);
                        }
                    })
            }
        }
        if (globalLoading.userContextLoading) {
            getPost(post_id);
            setGlobalLoading({...globalLoading, editContextLoading: true});
        };
    }, [globalLoading.userContextLoading, query])
    if (!globalLoading.userContextLoading) {
        return (<Loading/>)
    }
    if (userInfo === null) {
        return (<Navigate to = "/login"/>)
    }
    return (
        <div >
            <div  id="EditPage-Container">
                <div >
                    {wholeQuery.editState === 'main' && <Main/>}
                    {wholeQuery.editState === 'preview' && (<Preview/>)}
                    {wholeQuery.editState === 'edit' && (<Edit/>)}
                    {wholeQuery.editState === 'publish' && <Publish/>}
                </div>
            </div>
        </div>
    )
}

export function getUrlToEditPage(editState, post_id) {
    return `/edit/editState=${editState}+post_id=${post_id}`;
}