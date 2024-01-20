import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { makeRequest } from "../../utils/requestHelpers";
import Loading from "../../components/Loading/Loading";
import LinkIcon from '../../utils/imgs/linkIcon.png'
import { GlobalLoadingContext } from "../../GlobalLoading";
import { UserContext } from "../../UserContext";
import { getUrlToEditPage } from "../EditPage/EditPage";
import Post from "../../components/Post/Post";
import Tag from "../../components/Tag/Tag";
import { hostIP } from "../../frontend.config";
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
    if (!post) {
        return <Loading/>
    }
    function handleEditClick(e) {
        makeRequest('PUT', 'POST_TODRAFT', {post_id},{'Content-Type': 'application/json'}, {credentials: 'include'})
        localStorage.setItem('editState', 'Edit')
        navigate(getUrlToEditPage('edit', post.post_id));
    }
    function handleDeleteClick(e) {
        makeRequest('DELETE', 'POST_DELETEONE', {post_id},{'Content-Type': 'application/json'}, {credentials: 'include'})
        navigate(`/1`);
    }
    function handleClick(e) {
        const tmp = e.currentTarget.id;
        const id = e.currentTarget.id;
        switch (id) {
            case 'link':
                var textToCopy = document.getElementById('linkText').innerText;
                navigator.clipboard.writeText(textToCopy);
        }

    }
    const url = `http://${hostIP}/api/post/uploads/banner-${post.post_id}.png`
    return (
        <div>
            <section className="container-full-1"></section>
            <img className="full-w" src={url}/>
            <div className="grid-h-5-2 mr-top-12">
                <Post post={post} isPreview={false}/>
                <div className="flex blk-ctr-l">
                    <div className="container-12-auto bdr-solid-1 bdr-solid-thin bdr-dark pd-6-6 flex flex-col gap-4 blk-ctr-h">
                        <div className="full-w h-8-4 bg-grey pd-3-6 flex blk-ctr">
                            <div className="full-w h-3-8 flex flex-wr gap-2 auto gap-row-1">
                                {post.tags.map(t => <Tag tag={t} isEdit={false}/>)}
                            </div>
                        </div>
                        <div className="flex hid full-w bg-grey h-3-2 blk-ctr gap-2 pd-2-1 ">
                            <p id="linkText" className="font-2 txt-long bg-white rd-1 container-9-1-4 flex blk-ctr-h auto font-b pd-1-2">
                                'https://themes.estudiopatagon.com/wordpress/maktub/a-small-river-named-duden-flows-by-their-place/it is link'
                            </p>
                            <img id='link' onClick={handleClick} className="icon-cont-sm w-1-1 h-1-2 crs" src={LinkIcon}/>
                        </div>
                        {userInfo && post.author === userInfo.userId && <div className="flex flex-col blk-ctr-h gap-2">
                            <button onClick={handleDeleteClick} className="font-2 btn btn-sm w-2-9 rd-1 prim-hover-ltr font-light font-b">Delete The Post</button>
                            <button onClick={handleEditClick} className="font-2 btn btn-sm w-2-9 rd-1 prim-hover-ltr font-light font-b">Edit The Post</button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostPage;