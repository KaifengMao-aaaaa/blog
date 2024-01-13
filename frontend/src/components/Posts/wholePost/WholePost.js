import './wholePost.css'
import defaultBanner from '../../../utils/imgs/defaultBanner.jpg';
import Markdown from 'react-markdown';
const WholePost = ({post}) => {

    const date = new Date(post.publish_time);
    return (
    <div className='wholePost-main'>
        <img onError={(e) => e.target.src = defaultBanner} src={post.banner}/>
        <h2 className='wholePost-main-title'>{post.title}</h2>
        <div className="wholePost-main-info">
            <time>{date.toLocaleTimeString()}{'  '}{date.toLocaleDateString()}</time>
            <p>{post.author_name}</p>
        </div>
        <div>
            <div className='wholePost-body-markdown'>
                <Markdown children={post.content}/>
            </div>
        </div>
    </div>
    )
};
export default WholePost;