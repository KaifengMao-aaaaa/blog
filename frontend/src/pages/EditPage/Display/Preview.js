import { useContext, useEffect } from 'react';
import quit from '../../../utils/imgs/quit.png'
import { EditPageContext } from '../../../layouts/EditPageContext';
import { useNavigate } from 'react-router-dom';
import Post from '../../../components/Post/Post';
const Preview = () => {
    const {post} = useContext(EditPageContext);
    const navigate = useNavigate();
    let url = '';
    if (post.banner) {
        url = URL.createObjectURL(post.banner);
    }
    return (
        <div className='container-full-auto bg-white pos-abs pos-tr'>
            <img className='pos-tr icon-cont-lg wrp-circle' onClick={() => navigate(-1)} src={quit}/>
            <img className='container-full-auto h-10-4 img-ctr mr-bottom-7' src={url}/>
            <div className='container-14-10-10'>
                <Post post={post} isPreview={false}/>
            </div>
        </div>
    )
}
export default Preview;