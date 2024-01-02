import { useParams, useNavigate, Navigate } from "react-router-dom";
import styles from './Css/postPage.module.css';
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../utils/requestHelpers";
import Loading from "../../components/Loading/Loading";
import Markdown from 'react-markdown';
import { UserContext } from "../../UserContext";
import { GlobalLoadingContext } from "../../GlobalLoading";
import { EditPage } from "../EditPage/EditPage";
const PostPage = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [username, setUsername] = useState('');
    const {userInfo} = useContext(UserContext);
    const {globalLoading} = useContext(GlobalLoadingContext);
    const [direct, setDirect] = useState('');
    useEffect(() => {
        
        async function getOnePost(postId) {
            let response = await makeRequest('GET', 'POST_GETONE', {postId},{'Content-Type': 'application/json'}, {credentials: 'include'})
            if (!response.ok) {
                return;
            }
            let result = await response.json();
            setPost(result.post);

            response = await makeRequest('GET', 'USER_GETNAME',{userId: result.post.author},{'Content-Type': 'application/json'}, {credentials: 'include'})
            result = await response.json();
            setUsername(result.username);
        }
        getOnePost(postId);
    }, [])
    if (!post || !username || !globalLoading.userContextLoading) {
        return <Loading/>
    }
    function handleHomeButtonClick(e) {
        setDirect('HOME');
    }
    function handleEditButtonClick(e) {
        setDirect('EDIT')
    }
    if (direct) {
        if (direct === 'HOME') {
            return <Navigate to={'/'}/>
        } else if (direct === 'EDIT') {
            return <Navigate to={`/edit/${post.id}`}/>
        }
    }
    const date = new Date(post.publish_time);
    return (<div className={styles.body}>
        <div className={styles.titleArea}>    
            <img src="https://images.ctfassets.net/hrltx12pl8hq/vfJfws5pq5PK8xSX6I1bV/d542f5862da3701e2afe687e9efbeff6/hero-image-robot-.jpg?fit=fill&w=1200&h=675&fm=webp" className={styles.bannerArea}/>
            <div className={styles.infoArea}>
                <h1 className={styles.title}>{post.title}</h1>
                <div>
                    <p className={styles.author}>{username}</p>
                    <time>{date.toLocaleTimeString()}{'  '}{date.toLocaleDateString()}</time>
                </div>
                <p className={styles.desc}>{post.des}</p>
            </div>
        </div>
        <div className={styles.contentArea}>
            <Markdown >{post.content}</Markdown>
        </div>    
        <div>
            {userInfo.userId === post.author && <button className={styles.homeButton} onClick={handleEditButtonClick}>Edit</button>}
            <button className={styles.homeButton} onClick={handleHomeButtonClick}>Home page</button>
        </div>
    </div>)
}
export default PostPage;