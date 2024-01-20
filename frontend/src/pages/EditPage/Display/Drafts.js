import {useContext, useEffect, useState } from 'react';
import { makeRequest } from '../../../utils/requestHelpers';
import DraftPost from '../../../components/Posts/draftPost/DraftPost';
import { defaultSolveException } from '../../../utils/helpers';
import { UserContext } from '../../../UserContext';
import { EditPageContext } from '../../../layouts/EditPageContext';
function Drafts() {
    const [posts, setPosts] = useState([]);
    const {setPost} = useContext(EditPageContext)
    const {userInfo} = useContext(UserContext)
    const [activedPostId, setActivedPostId] = useState(null);

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
    function handleEditClick(post, e) {
        setPost(post);
        localStorage.setItem('post', JSON.stringify(post));   
        setActivedPostId(post.post_id);
    }
    const renderedPosts = posts.map(post => <DraftPost key={post.post_id} post={post} onDelete={() => handleDeletePost(post.post_id)} onEdit={(e) => handleEditClick(post, e)} isActived={activedPostId === post.post_id}/>)
    return (
        <div className='pos-abs pos-r-0-0 container-30-full flex flex-col bg-grey bdr-solid-left-1 bdr-dark gap-4 pd-5-0 blk-ctr-h auto'>
            {renderedPosts}
            {renderedPosts.length === 0 && <h2 className='font-b'>There are not any drafts</h2>}
        </div>
    )
}
export default Drafts;