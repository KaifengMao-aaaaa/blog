import { useContext, useState } from "react";
import './publish.css'
import quitImg from '../../../utils/imgs/quit.png'
import { UserContext } from '../../../UserContext';
import Post from '../../../components/Post/Post';
import { makeRequest } from '../../../utils/requestHelpers';
import { Navigate } from 'react-router-dom';
import Tag from '../../../components/Tag/Tag';
import { GlobalLoadingContext } from '../../../GlobalLoading';
import Loading from '../../../components/Loading/Loading';
import { defaultSolveException } from '../../../utils/helpers';
import { EditPageContext } from "../../../layouts/EditPageContext";
import HomePost from "../../../components/Posts/homePost/HomePost";
import SquarePost from "../../../components/Posts/squarePost/SquarePost";
function Publish() {
    const {blog, setBlog, setEditState} = useContext(EditPageContext);
    const {userInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState('')
    const {globalLoading, setGlobalLoading} = useContext(GlobalLoadingContext);
    function handleBannerError(e) {
        e.target.src = 'https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png'
    }
    function handleDesChange(e) {
        setBlog({...blog, des: e.target.value});
    }
    function handleTitleChange(e) {
        setBlog({...blog, title: e.target.value});
    }
    function handlePublishBlog(e) {
        makeRequest('POST', 'POST_PUBLISH', {post:{...blog, author:userInfo.userId}}, {'Content-Type': 'application/json'}, {credentials: 'include'})
            .then((response) => {
                if (response.ok) {
                    setRedirect('HOME');
                } else {
                    defaultSolveException(response);
                }
            })
            .catch(e => alert(e));
    }
    function handlekeyDownTag(e) {
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.preventDefault();
            if (!blog.tags.includes(e.target.value) && blog.tags.length + 1 < 10) {
                setBlog({...blog, tags: [...blog.tags, e.target.value]})
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
                <SquarePost post={blog}/>
            </div>
            <div className="publish-main-body-set">
                <div className="publish-main-body-set-description">
                    <p>Description</p>
                    <textarea
                        onChange={(e) => setBlog({...blog, des: e.target.value})}
                        placeholder="...."
                        value={blog.des}
                    />
                </div>
                <div className='publish-main-body-set-tags'>
                    <p>Tags</p>
                    <div className="publish-main-body-set-tags-box">
                        <input onKeyDown={handlekeyDownTag} className='publish-main-body-set-tags-input' placeholder='Tag'/>
                        <div className='publish-main-body-set-tags-display'>
                            {blog.tags.map((tag, i) => <Tag key={i} tag={tag}/>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button className="publish-main-publish-button">Publish</button>
        <img className="publish-main-quit-img" src={quitImg} onClick={() => setEditState('Edit')}/>
    </div>)
    // return (<div className={styles.body}>
    //             <Post post={{...blog, publish_time: Date.now(), author: userInfo.username}}/>
    //             <section className={styles.inputArea}>
    //                 <div>
    //                     <p className={styles.titleText}>Title</p>
    //                     <input onChange={handleTitleChange} className={styles.titleBox} value={blog.title}/>
    //                 </div>
    //                 <div>
    //                     <p className={styles.desText}>Short description about your blog</p>
    //                     <textarea onChange={handleDesChange} value={blog.des} maxLength={200}className={styles.desBox}/>
    //                 </div>  
                    // <div className={styles.tagArea}>
                    //     <p>Tags</p>
                    //     <div className={styles.tagBox}>
                    //         <input onKeyDown={handlekeyDownTag} className={styles.tagInput} placeholder='Tag'/>
                    //         <div className={styles.tagDisplayArea}>
                    //             {blog.tags.map((tag, i) => <Tag key={i} tag={tag}/>)}
                    //         </div>
                    //     </div>
                    // </div>
    //                 <button onClick={handlePublishBlog} className={styles.publishButton}>Publish!</button>
    //             </section>
    // </div>)
}
export default Publish;