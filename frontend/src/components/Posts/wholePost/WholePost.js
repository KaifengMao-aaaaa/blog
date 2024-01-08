import './wholePost.css'
import defaultBanner from '../../../utils/imgs/defaultBanner.jpg';
const WholePost = ({post}) => {

    return (
    <div className='wholePost-main'>
        <img onError={(e) => e.target.src = defaultBanner} src={post.banner}/>
        <h2>{post.title}</h2>
        <div className="wholePost-main-info">
            {/* <time>{date.toLocaleTimeString()}{'  '}{date.toLocaleDateString()}</time> */}
            <p>{post.author}</p>
        </div>
        <p>
            {post.content}
        </p>
    </div>
    )
};
export default WholePost;