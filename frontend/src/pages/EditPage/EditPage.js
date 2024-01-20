import { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from "../../UserContext"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Edit from "./Display/Edit";
import Preview from "./Display/Preview";
import Publish from "./Display/Publish";
import { GlobalLoadingContext } from "../../GlobalLoading";
import Loading from "../../components/Loading/Loading";
import { makeRequest } from "../../utils/requestHelpers";
import Drafts from "./Display/Drafts";
import { defaultSolveException } from "../../utils/helpers";
import { EditPageContext, postStructure } from "../../layouts/EditPageContext";
export const EditContext = createContext({});
export function EditPage() {
    const {userInfo} = useContext(UserContext);
    const {globalLoading, setGlobalLoading} = useContext(GlobalLoadingContext);
    const {wholeQuery,setWholeQuery, post, setPost, isOpenDrafts, setIsOpenDrafts} = useContext(EditPageContext)

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
        if (globalLoading.userContextLoading) {
            setGlobalLoading({...globalLoading, editContextLoading: true});
            localStorage.setItem('post', JSON.stringify(post));
        };
    }, [globalLoading.userContextLoading, query, post])
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
                    {isOpenDrafts && <Drafts/>}
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