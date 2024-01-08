import './homePost.css'
import profileImg from './config.png'
import { useNavigate } from 'react-router-dom';
const HomePost = ({post}) => {
    const navigate = useNavigate();
    const date = new Date(post.publish_time);
    return <div className="homePost-body">
        <div className='homePost-body-info'>
            <img src={profileImg} alt='img'/>
            <div className='homePost-body-info-text'>
                <h2>{post.title}</h2>
                <div className='homePost-body-info-meta'>
                    <time>{date.toLocaleTimeString()}{'  '}{date.toLocaleDateString()}</time>
                </div>
            </div>
        </div>
        <p className='homePost-body-description'>
            {post.des}
        </p>
        <div className='homePost-body-bottom'>
            <div className='homePost-body-bottom-tags'>
                asdasd
            </div>
            <p>
               {post.author}
            </p>
        </div>
        <button onClick={() => navigate(`/post/${post.post_id}`)}>Continue Reading</button>
    </div>
}
export default HomePost;