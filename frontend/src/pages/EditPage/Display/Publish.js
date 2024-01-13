import { useContext, useState } from "react";
import './publish.css'
import quitImg from '../../../utils/imgs/quit.png'
import { UserContext } from '../../../UserContext';
import Post from '../../../components/Post/Post';
import { makeRequest } from '../../../utils/requestHelpers';
import { Navigate, useNavigate } from 'react-router-dom';
import Tag from '../../../components/Tag/Tag';
import { GlobalLoadingContext } from '../../../GlobalLoading';
import Loading from '../../../components/Loading/Loading';
import { defaultSolveException } from '../../../utils/helpers';
import { EditPageContext } from "../../../layouts/EditPageContext";
import HomePost from "../../../components/Posts/homePost/HomePost";
import SquarePost from "../../../components/Posts/squarePost/SquarePost";
function Publish() {
    const {post, setPost} = useContext(EditPageContext);
    const {userInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState('')
    const {globalLoading, setGlobalLoading} = useContext(GlobalLoadingContext);
    const navigate = useNavigate();
    function handlePublishPost(e) {
        makeRequest('POST', 'POST_PUBLISH', {post:{...post, author:userInfo.userId, is_draft: false}}, {'Content-Type': 'application/json'}, {credentials: 'include'})
            .then((response) => {
                if (response.ok) {
                    setRedirect('HOME');
                } else {
                    defaultSolveException(response);
                }
                localStorage.removeItem('post')
            })
            .catch(e => alert(e));
    }
    function handlekeyDownTag(e) {
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.preventDefault();
            if (!post.tags.includes(e.target.value) && post.tags.length + 1 < 10) {
                setPost({...post, tags: [...post.tags, e.target.value]})
                e.target.value = '';
            }
            
        }
    }
    if (!globalLoading.editContextLoading) {
        return <Loading/>;
    }
    if (redirect === 'HOME') {
        return <Navigate to={'/'}/>
    }
    return (<div className='publish-main'>
        <div className="publish-main-body">
            <div className="publish-main-body-preview">
                <SquarePost post={post}/>
            </div>
            <div className="publish-main-body-set">
                <div className="publish-main-body-set-description">
                    <p>Description</p>
                    <textarea
                        onChange={(e) => setPost({...post, des: e.target.value})}
                        placeholder="...."
                        value={post.des}
                    />
                </div>
                <div className='publish-main-body-set-tags'>
                    <p>Tags</p>
                    <div className="publish-main-body-set-tags-box">
                        <input onKeyDown={handlekeyDownTag} className='publish-main-body-set-tags-input' placeholder='Tag'/>
                        <div className='publish-main-body-set-tags-display'>
                            {post.tags.map((tag, i) => <Tag key={i} tag={tag}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button className="publish-main-publish-button" onClick={handlePublishPost}>Publish</button>
        <img className="publish-main-quit-img" src={quitImg} onClick={() => navigate(-1)}/>
    </div>)
}
export default Publish;