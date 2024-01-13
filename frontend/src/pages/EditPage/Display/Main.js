import {useContext, useEffect, useState } from 'react';
import './main.css';
import { makeRequest } from '../../../utils/requestHelpers';
import DraftPost from '../components/DraftPost';
import { defaultSolveException } from '../../../utils/helpers';
import { UserContext } from '../../../UserContext';
function Main() {
    const [posts, setPosts] = useState([]);
    const {userInfo} = useContext(UserContext)
    useEffect(() => {
        makeRequest('GET', 'POST_GET',{number: 10, offset: 0, author: userInfo.userId, is_draft: true}, {'Content-Type': 'application/json'}, {credentials:'include'} )
            .then(response => {
                if (response.ok) {
                    response.json().then(result => {setPosts(result.posts);})
                } else {
                    defaultSolveException(response);
                }
            })
    }, [])
    const handleDeletePost = (post_id) => {
        setPosts(posts.filter(post => post.post_id !== post_id));
        makeRequest('DELETE', 'POST_DELETEONE',{post_id}, {'Content-Type': 'application/json'}, {credentials:'include'} )
    };
    const renderedPosts = posts.map(post => <DraftPost key={post.post_id} post={post} onDelete={() => handleDeletePost(post.post_id)}/>)
    return (<div className='draft-main'>
        <div className='draft-main-body'>
            <div className='draft-main-side'>
                <div className='draft-main-side-top'>
                    <h3>Draft</h3>
                </div>
            </div>
            <div className='draft-main-body-area'>
                {renderedPosts}
                {renderedPosts.length === 0 && <h2>There are not any drafts</h2>}
            </div>
        </div>
    </div>)
}
export default Main;