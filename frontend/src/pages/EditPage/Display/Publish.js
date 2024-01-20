import { useContext, useEffect, useState } from "react";
import quitImg from '../../../utils/imgs/quit.png'
import { UserContext } from '../../../UserContext';
import { makeRequest } from '../../../utils/requestHelpers';
import { Navigate, useNavigate } from 'react-router-dom';
import Tag from '../../../components/Tag/Tag';
import { GlobalLoadingContext } from '../../../GlobalLoading';
import Loading from '../../../components/Loading/Loading';
import { EditPageContext } from "../../../layouts/EditPageContext";
import HomePost from "../../../components/Posts/homePost/HomePost";
function Publish() {
    const {post, setPost} = useContext(EditPageContext);
    const {userInfo} = useContext(UserContext);
    const [redirect, setRedirect] = useState('')
    const [hover, setHover] = useState('');
    const {globalLoading, setGlobalLoading} = useContext(GlobalLoadingContext);
    const [allCategories, setAllCategories] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
            makeRequest('GET', 'POST_LISTCATEGORIES', {}, {}, {credentials: 'include'})
                .then((response) => {
                    if (response.ok) {
                    response.json().then((data) => setAllCategories(data.categories))
                    }
                })
    }, [])
    function handlePublishPost(e) {
        makeRequest('POST', 'POST_PUBLISH', {post:{...post, author:userInfo.userId, is_draft: false}}, {'Content-Type': 'application/json'}, {credentials: 'include'})
            .then((response) => {
                if (response.ok) {
                    setRedirect('HOME');
                    localStorage.removeItem('post')
                    response.json().then(data => {
                        const formData = new FormData();
                        formData.append('banner', post.banner);
                        fetch(`/api/post/upload?post_id=${data.postId}`, 
                            { 
                                method: 'POST',
                                body: formData,
                            }
                        )
                    })
                } 
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
    function handleDeleteTag(tag) {
        setPost({...post, tags: post.tags.filter(t => t != tag)})
    }
    if (!globalLoading.editContextLoading) {
        return <Loading/>;
    }
    if (redirect === 'HOME') {
        return <Navigate to={'/1'}/>
    }
    const regex = new RegExp(post.category, 'i');
    return (
        <div className='container-full-auto h-11-8 flex flex-col blk-ctr bg-white pos-tl'>
            <img className='pos-tr icon-cont-lg pos-r-2-6 wrp-circle' onClick={() => navigate(-1)} src={quitImg}/>
            <div className="pd-10-20 bdr-solid-1 bdr-dark grid-h-1-2 hid container-14-7-10 mr-top-20 mr-bottom-5">
                <div className="">
                    <HomePost post={post} isPreview={true}/>
                </div>
                <div className="pd-0-10">
                    <p className="font-3 font-b mr-bottom-3">Description</p>
                    <textarea
                        className="h-3-4 w-4-9 auto bg-grey font-2 pd-4-6 mr-bottom-3 font-b"
                        onChange={(e) => setPost({...post, des: e.target.value})}
                        placeholder="...."
                        value={post.des}
                    />
                    <p className="font-3 font-b mr-bottom-3">Category</p>
                    <div className="pos-rel">
                        <input className="bg-grey w-4-9 h-3-2 font-3 pd-2-6 mr-bottom-7 font-b" value={post.category} onChange={(e) => setPost({...post, category: e.target.value})} placeholder="...." onMouseEnter={() => setHover('category')} onMouseLeave={() => setHover('')}/>
                        {hover === 'category' && <div className="pos-abs pos-t-full container-8-auto flex flex-col bg-white gap-2 pd-2-2 z-1 sdw-lr-reg pd-5-5">
                            {allCategories.filter(category => regex.test(category.name)).map(category => <p className="full-w blk-ctr-l font-b font-2">{category.name}</p> )}
                        </div>}
                    </div>
                    <p className="font-3 font-b mr-bottom-7">Tags</p>
                    <div className="container-full-25 grid-1-3 bg-grey pd-5-6 gap-3">
                        <input onKeyDown={handlekeyDownTag} className='h-4-1 full-w pd-0-4 font-2 auto'bg-black placeholder='Tag'/>
                        <div className='full-h flex flex-wr gap-row-1 gap-2 auto'>
                            {post.tags.map((tag, i) => <Tag key={i} tag={tag} isEdit={true} onDelete={() => handleDeleteTag(tag)}/>)}
                        </div>
                    </div>

                </div>
            </div>
            <button className="btn btn-sm rd-2 flex blk-ctr font-light prim-hover-sdw" onClick={handlePublishPost}>Publish</button>
        </div>
    )
}
export default Publish;