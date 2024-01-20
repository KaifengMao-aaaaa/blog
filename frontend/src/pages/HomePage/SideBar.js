import { useEffect, useState } from 'react';
import SidePost from '../../components/Posts/sidePost/SidePost';
import { makeRequest } from '../../utils/requestHelpers';
import { defaultSolveException } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
const SideBar = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        makeRequest('GET', 'POST_GET', {offset: 0, number: 8, order_by: 'publish_time desc', is_draft:false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
            .then(response => {
                if (response.ok) {
                    response.json().then(result => setPosts(result.posts));
                } else {
                    defaultSolveException(response);
                }
            })
    }, [])
    function handleOnClick(post_id) {
        navigate(`/post/${post_id}`)
    }
    return <div className="sideBar-body">
        <div className='sideBar-body-divider'>
            <p>Recent posts</p>
            <div></div>
        </div>
        <div>
            {posts.map(post => <SidePost key={post.post_id} post={post} onClick={() => handleOnClick(post.post_id)}/>)}
            {posts.length === 0 && <h2>No Recent Posts</h2>}
        </div>
    </div>
}
export default SideBar;