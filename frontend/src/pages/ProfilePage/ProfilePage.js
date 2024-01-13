import SquarePost from '../../components/Posts/squarePost/SquarePost';
import './profilePage.css'
import { useContext, useEffect, useState } from 'react';
import { makeRequest } from '../../utils/requestHelpers';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const {userInfo} = useContext(UserContext);
    const [postsNum, setPostNum] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        async function getPosts(author) {
            let response = await makeRequest('GET', 'POST_GET', {author, offset: offset, number: 8, is_draft: false, author},{'Content-Type': 'application/json'}, {credentials: 'include'})
            let response2 = await makeRequest('GET', 'POST_GET', {author, offset: 0, number: 999, is_draft: false},{'Content-Type': 'application/json'}, {credentials: 'include'})
            if (response.ok && response2.ok) {
                response = await response.json();
                response2 = await response2.json();
                setAllPosts(response.posts);
                setPostNum(response2.posts.length);
            }
        } 
        getPosts(userInfo.userId);
    }, [offset])
    return (<div className='profilePage-main'>
        <div className='profilePage-main-introduction'>
            <h2>{localStorage.getItem('username')}</h2>
            <div className='profilePage-main-statistic'>
                <div className='profilePage-main-statistic-container'>
                    <p className='profilePage-main-statistic-container-key'>Number of Posts</p>
                    <p className='profilePage-main-statistic-container-value'>
                        {postsNum}
                    </p>
                </div>
            </div>
        </div>
        <div className='profilePage-main-body'>
            {allPosts.length === 0 && <h2>No Any Post</h2>}
            {
                allPosts.map((post, index) => 
                <label onClick={() => navigate(`/post/${post.post_id}`)}>
                    <SquarePost key={index} post={post}/>
                </label>)
            }
        </div>
        <div className='profilePage-main-bottom'>
            <p>Page {parseInt(offset / 8) + 1} of {parseInt((postsNum) / 9) + 1}</p>
            <button onClick={() => setOffset((prev) => prev >= 8 ? prev - 8 : prev)}>Before</button>
            <button onClick={() => setOffset((prev) => prev + 8 < postsNum ? prev + 8 : prev)}>Next</button>
        </div>
    </div>)
};
export default ProfilePage;