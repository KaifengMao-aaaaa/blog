import { useContext, useEffect } from 'react';
import quit from '../../../utils/imgs/quit.png'
import { EditPageContext } from '../../../layouts/EditPageContext';
import { useNavigate } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import { hostIP } from '../../../frontend.config';
const Preview = () => {
    const {post} = useContext(EditPageContext);
    const navigate = useNavigate();
    let url = '';
    if (post.post_id) {
        url = `http://${hostIP}/api/post/uploads/banner-${post.post_id}.png`
    } else {
        url = `http://${hostIP}/api/post/uploads/banner-default.png`
    }
    return (
        <div className='container-full-auto bg-white pos-t-0 pos-abs'>
            <img className='pos-tr icon-cont-lg wrp-circle' onClick={() => navigate(-1)} src={quit}/>
            <img className='container-full-auto h-auto img-ctr mr-bottom-7' src={url}/>
            <div className='container-14-10-10'>
                <Post post={post} isPreview={false}/>
            </div>
        </div>
    )
}
export default Preview;