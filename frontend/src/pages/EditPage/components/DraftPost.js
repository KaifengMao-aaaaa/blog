import { useContext, useState } from 'react';
import { EditPageContext } from '../../../layouts/EditPageContext';
import { useNavigate } from 'react-router-dom';
import { getUrlToEditPage } from '../EditPage';
export default function DraftPost({post, onDelete}) {
    const date = new Date(post.publish_time);
    const {setPost} = useContext(EditPageContext)
    const navigate = useNavigate();
    function handleEditClick(e) {
        setPost(post);
        localStorage.setItem('post', JSON.stringify(post));   
        navigate(getUrlToEditPage('edit', ''));
    }
    return ( <div className='draftPost-main'>
        <div className='draftPost-main-banner'>
            <img src={post.banner}/>
        </div>
        <div className='draftPost-main-body'>
            <div className='draftPost-main-body-container'>
                <h2>Draft name:</h2>
                <p>{post.title}</p>
            </div>
            <div className='draftPost-main-body-container'>
                <h2>Last modified:</h2>
                <time>{date.toLocaleTimeString()}{'  '}{date.toLocaleDateString()}</time>
            </div>
        </div>
        <div className='draftPost-main-buttons'>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={() => onDelete()}>Delete</button>
        </div>
    </div>
    )
}