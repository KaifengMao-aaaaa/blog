import { useContext, useEffect, useRef, useState } from "react";
import { EditContext } from "../EditPage";
import { makeRequest } from '../../../utils/requestHelpers';
import { UserContext } from '../../../UserContext';
import { GlobalLoadingContext } from '../../../GlobalLoading';
import Loading from '../../../components/Loading/Loading';
import { defaultSolveException } from '../../../utils/helpers';
import fullImg from '../../../utils/imgs/full.png';
import MonacoEditor from 'react-monaco-editor';
import upload from '../../../utils/imgs/upload.png'
import './edit.css'
import Markdown from 'react-markdown';
import { EditPageContext } from "../../../layouts/EditPageContext";
const Edit = () => {
    const {blog, setBlog, editState, setEditState} = useContext(EditPageContext);
    const {userInfo} = useContext(UserContext);
    const {globalLoading} = useContext(GlobalLoadingContext)
    const fileInputRef = useRef();
    useEffect(() => {
    }, [])
    function handleUpload(e) {
        e.preventDefault()
        const img = e.target.files[0];
        if (img) {
            const url = URL.createObjectURL(img);
            setBlog({...blog, banner: url});
        }
    }
    function saveDraft() {
        makeRequest('POST', 'POST_PUBLISH', {post:{...blog, isDraft: blog.isDraft, id: localStorage.getItem('postId'), author: userInfo.userId}}, {'Content-Type': 'application/json'}, {credentials:'include'})
            .then(response => {
                if (response.ok) {
                    response.json().then(result => localStorage.setItem('postId', result.postId))
                } else {
                   defaultSolveException(response); 
                }
            });
    }
    function handleContentChange(newValue, e) {
        setBlog(prevBlog => {
            return {...prevBlog, content: newValue};
        });
    }
    function handleTitleChange(e) {
        e.preventDefault();
        setBlog({...blog, title: e.target.value});
    }
    function handleTitleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }
    function handleFullPreview(e) {
        setEditState('Preview');
    }
    if (!globalLoading.editContextLoading) {
        return <Loading/>;
    }
    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: false,
    };
    return (
        <div className='editDisplay-main'>
            <div className='editDisplay-main-titleArea'>
                <p className='editDisplay-main-title-top'>TITLE</p>
                <input className="editDisplay-main-title" placeholder={'Add Title'} value={blog.title} onChange={handleTitleChange}/>
            </div>

            <div className='editDisplay-body'>
                <div className='editDisplay-body-source'>
                    <div className='editDisplay-body-source-head'>
                        <h3>MARKDOWN</h3>
                    </div>
                    <div className='editDisplay-body-source-lines'>
                        <MonacoEditor
                            width="auto"
                            height="560px"
                            language="markdown"
                            theme="vs-light"
                            value={blog.content}
                            options={editorOptions}
                            onChange={handleContentChange}
                        />
                    </div>
                </div>
                <div className='editDisplay-body-preview'>
                    <div className='editDisplay-body-preview-head'>
                        <h3>PREVIEW</h3>
                        <div className="editDisplay-body-preview-icons">
                            <img src={upload} onClick={() => fileInputRef.current.click()}/>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{display:"none"}}
                                onChange={handleUpload}
                                accept=".pdf, .jpg, .jpeg"
                            />
                            <img onClick={handleFullPreview} src={fullImg}/>
                        </div>
                    </div>
                    <div className='editDisplay-body-preview-markdown'>
                        <Markdown children={blog.content}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Edit;