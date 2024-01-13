import { useParams, useNavigate, Navigate } from "react-router-dom";
import './postPage.css'
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../utils/requestHelpers";
import Loading from "../../components/Loading/Loading";
import LinkIcon from '../../utils/imgs/linkIcon.png'
import { GlobalLoadingContext } from "../../GlobalLoading";
import SideBar from "../HomePage/SideBar";
import WholePost from "../../components/Posts/wholePost/WholePost";
import DisplayTag from "../../components/Tag/DisplayTag";
import { UserContext } from "../../UserContext";
import { getUrlToEditPage } from "../EditPage/EditPage";
const PostPage = () => {
    const {post_id} = useParams();
    const [post, setPost] = useState(null);
    const {globalLoading} = useContext(GlobalLoadingContext);
    const {userInfo} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        
        async function getOnePost(post_id) {
            let response = await makeRequest('GET', 'POST_GET', {post_id},{'Content-Type': 'application/json'}, {credentials: 'include'})
            if (!response.ok) {
                return;
            }
            let result = await response.json();
            setPost(result.posts[0]);
        }
        getOnePost(post_id);
    }, [post_id])
    if (!post || !globalLoading.userContextLoading) {
        return <Loading/>
    }
    function handleEditClick(e) {
        makeRequest('PUT', 'POST_TODRAFT', {post_id},{'Content-Type': 'application/json'}, {credentials: 'include'})
        localStorage.setItem('editState', 'Edit')
        navigate(getUrlToEditPage('edit', post.post_id));
    }
    function handleDeleteClick(e) {
        makeRequest('DELETE', 'POST_DELETEONE', {post_id},{'Content-Type': 'application/json'}, {credentials: 'include'})
        navigate(`/`);
    }
    return (
    <div className="postPage-main">
        <div className="postPage-main-postArea">
            {   post.author === userInfo.userId &&
                <div className="postPage-main-top">
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={handleDeleteClick}>Delete</button>
                </div>
            }
            <WholePost post={post}/>
            <div className="postPage-main-postArea-tagsArea">
                <p>Categorized in:</p>
                <div>
                    <div className='squarePost-body-bottom-tags'>
                        {post.tags.map((tag, i) => <DisplayTag key={i} tag={tag}/>)}
                    </div>
                </div>
            </div>
            <div className="postPage-main-share">
                <div>
                    <p>
                        'https://themes.estudiopatagon.com/wordpress/maktub/a-small-river-named-duden-flows-by-their-place/it is link'
                    </p>
                    <img src={LinkIcon}/>
                </div>
            </div>
        </div>
        <SideBar/>
    </div>)
}
export default PostPage;