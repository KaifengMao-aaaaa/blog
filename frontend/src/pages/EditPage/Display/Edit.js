import { useContext, useEffect, useRef, useState } from "react";
import { GlobalLoadingContext } from '../../../GlobalLoading';
import Loading from '../../../components/Loading/Loading';
import fullImg from '../../../utils/imgs/full.png';
import MonacoEditor from 'react-monaco-editor';
import upload from '../../../utils/imgs/upload.png'
import Markdown from 'react-markdown';
import { EditPageContext } from "../../../layouts/EditPageContext";
import { useNavigate } from "react-router-dom";
import Post from "../../../components/Post/Post";
const Edit = () => {
    const {post, setPost} = useContext(EditPageContext);
    const {globalLoading} = useContext(GlobalLoadingContext)
    const fileInputRef = useRef();
    const navigate = useNavigate();

    function handleUpload(e) {
        e.preventDefault()
        const img = e.target.files[0];
        if (img.type.match('image')) {
            // const url = URL.createObjectURL(img);
            setPost({...post, banner: img});

        }
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
        <div className="container-full-auto">
            <div className="container-full-9 grid-1-2  pd-2-9">
                <div>
                    <p className='font-2 font-b'>TITLE</p>
                </div>
                <div>
                    <input className="font-4 font-w-6 font-t" placeholder={'Add Title'} value={post.title} onChange={handleTitleChange}/>
                </div>
            </div>
            <div className="container-full-5 bdr-solid-1 bdr-thin bdr-dark-light grid-h-1-1 blk-ctr-h">
                <div className="pd-0-9">
                    <p className="font-2 font-t">MARKDOWN</p>
                </div>
                <div className="flex flex-h flex-be">
                    <p className="font-2 font-t">PREVIEW</p>
                    <div className="flex gap-2 pd-right-5 blk-ctr-h">
                        <img className='icon-cont-xsm' src={upload} onClick={() => fileInputRef.current.click()}/>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{display:"none"}}
                            onChange={handleUpload}
                            accept=".pdf, .jpg, .jpeg"
                        />
                        <img className="icon-cont-xsm" onClick={handleFullPreview} src={fullImg}/>
                    </div>
                </div>
            </div>
            <div className="grid-h-1-1">
                <div className="bg-black">
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
                <div className="h-10-7 auto">
                    <Post post={post} isPreview={true}/>
                </div>
            </div>
        </div>
    )
}
export default Edit;