import './squarePost.css'
import Img from '../../../utils/imgs/config.png'
import Tag from '../../Tag/Tag';
const SquarePost = ({post}) => {
    // const date = new Date(post.publish_time);
    return (
    <div className='squarePost-body'>
        <div className='squarePost-body-top'>
            <img src={Img}/>
            <h3>{post.title}</h3>
        </div>
        <div className='squarePost-body-main'>

            {/* <time>{date.toLocaleTimeString()}{'  '}{date.toLocaleDateString()}</time> */}
            <div className='squarePost-body-main-meta'>
                <time>{'August 15, 2019'}</time>
                <p className='squarePost-body-bottom-author'>{post.author}</p>
            </div>
            <p>
                {post.des}
            </p>
        </div>
        <div className='squarePost-body-bottom'>

            <div className='squarePost-body-bottom-tags'>
                {post.tags.map((tag, i) => <Tag key={i} tag={tag}/>)}
            </div>
        </div>
    </div>)
}
export default SquarePost;