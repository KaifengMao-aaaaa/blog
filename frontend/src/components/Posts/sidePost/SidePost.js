import './sidePost.css'
import Img from '../homePost/config.png'
const SidePost = ({post, onClick}) => {
    const date = new Date(post.publish_time);
    return (
        <label className='sidePost-body' onClick={onClick}>
            <img src={Img} alt="Post"/>
            <div className='sidePost-body-texts'>
                <h3>{post.title}</h3>
                <div>
                    <time>{date.toLocaleDateString()}</time>
                    <time>{date.toLocaleTimeString()}</time>
                </div>
            </div>
        </label>
);
}
export default SidePost;