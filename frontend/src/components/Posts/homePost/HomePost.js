import './homePost.css'
import profileImg from './config.png'
import { useNavigate } from 'react-router-dom';
import Tag from '../../Tag/Tag';
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
                    {post.tags.map((tag, i) => <Tag key={i} tag={tag}/>)}
            </div>
            <p className='homePost-body-bottom-author'>
               {post.author_name}
            </p>
        </div>
        <button className='homePost-body-read' onClick={() => navigate(`/post/${post.post_id}`)}>Continue Reading</button>
    </div>
}
export default HomePost;