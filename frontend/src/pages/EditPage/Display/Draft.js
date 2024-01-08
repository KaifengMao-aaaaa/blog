import {useContext, useEffect, useState } from 'react';
import styles from '../Css/draft.module.css';
import { makeRequest } from '../../../utils/requestHelpers';
import DraftPost from '../components/DraftPost';
import { defaultSolveException } from '../../../utils/helpers';
function Draft() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        makeRequest('GET', 'POST_GETDRAFTS',{number: 10, offset: 0}, {'Content-Type': 'application/json'}, {credentials:'include'} )
            .then(response => {
                if (response.ok) {
                    response.json().then(result => {setPosts(result.drafts);})
                } else {
                    defaultSolveException(response);
                }
            })
    }, [])
    const handleDeletePost = (postId) => {
        setPosts(posts.filter(post => post.post_id !== postId));
    };
    const renderedPosts = posts.map(post => <DraftPost key={post.post_id} post={post} onDelete={() => handleDeletePost(post.post_id)}/>)
    return (<div className='draft-main'>
        it is me
    </div>)
}
export default Draft;