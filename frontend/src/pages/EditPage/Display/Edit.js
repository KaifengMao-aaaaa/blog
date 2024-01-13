import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from '../../../UserContext';
import { GlobalLoadingContext } from '../../../GlobalLoading';
import Loading from '../../../components/Loading/Loading';
import fullImg from '../../../utils/imgs/full.png';
import MonacoEditor from 'react-monaco-editor';
import upload from '../../../utils/imgs/upload.png'
import './edit.css'
import Markdown from 'react-markdown';
import { EditPageContext } from "../../../layouts/EditPageContext";
import { useNavigate } from "react-router-dom";
const Edit = () => {
    const {post, setPost} = useContext(EditPageContext);
    const {globalLoading} = useContext(GlobalLoadingContext)
    const fileInputRef = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(saveDraft, 5000);
        return () => clearInterval(interval);
    }, [post])
    function handleUpload(e) {
        e.preventDefault()
        const img = e.target.files[0];
        if (img) {
            const url = URL.createObjectURL(img);
            setPost({...post, banner: url});
        }
    }
    function saveDraft() {
        localStorage.setItem('post', JSON.stringify(post))
    }
    function handleContentChange(newValue, e) {
        setPost(prevPost => {
            return {...prevPost, content: newValue};
        });
    }
    function handleTitleChange(e) {
        e.preventDefault();
        setPost({...post, title: e.target.value});
    }
    function handleFullPreview(e) {
        let urls = window.location.href.split('/');
        const index = urls[urls.length - 1].lastIndexOf('edit');
        urls[urls.length - 1] = urls[urls.length - 1].substring(0, index) + 'preview' + urls[urls.length - 1].substring(index + 4);
        urls = urls.splice(3);

        navigate('/' + urls.join('/'));
        
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
                <input className="editDisplay-main-title" placeholder={'Add Title'} value={post.title} onChange={handleTitleChange}/>
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
                            value={post.content}
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
                        <Markdown children={post.content}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Edit;