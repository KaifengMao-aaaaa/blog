import profileIconImg from '../../../utils/imgs/profile.png'
import timeSpanImg from '../../../utils/imgs/timeSpan.png'
import { useNavigate } from 'react-router-dom';
import { hostIP } from '../../../frontend.config';
const HomePost = ({post, isPreview}) => {
    const navigate = useNavigate();
    const date = new Date(post.publish_time);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    let url = `http://${hostIP}/api/post/uploads/banner-${post.post_id}.png`
    return (
        <div className='container-16-23-3 grid-4-7 gap-2 hid'>
            <div className='container-12-5 rd-1 hid pos-rel'>
                <img className='full-w full-h img-ctr' src={url} onError={(e) => e.target.src = `http://${hostIP}/api/post/uploads/banner-default.png`}/>
                <p onClick={() => navigate(`/category/${post.category}`)}  className='pos-tl font-light bg-green pd-2-5 rd-1 font-b crs'>{post.category}</p>
            </div>
            <div className='grid-1-3 gap-1'>
                <div className='grid-2-1'>
                    <h2 className='font-t font-3 font-h-9 hid'>{post.title}</h2>
                    <div className='flex gap-3 bg-white blk-ctr blk-ctr-l font2 font-w-7 font-b'>
                        <div className='flex gap-1'>
                            <img className='icon-cont-xsm' src={profileIconImg}/>
                            <p className='dt-hover-sdw crs'>{post.author_name}</p>
                        </div>
                        <div className='flex gap-1'>
                            <img className='icon-cont-xsm' src={timeSpanImg}/>
                            <time>{formattedDate}</time>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 hid'>
                    <p className='font-2 font-h-9 font-w-2 font-b hid'>
                        {post.des}
                    </p>
                    {!isPreview && <div className='flex blk-ctr-l pd-left-3'>
                        <button className='crs font-light btn-xxsm btn prim-hover-ltr rd-11 light' onClick={() => navigate(`/post/${post.post_id}`)}>Read</button>
                    </div>}
                </div>
            </div>
        </div>
    )
    // return <div className="homePost-body">
    //     <div className='homePost-body-info'>
    //         <img src={profileImg} alt='img'/>
    //         <div className='homePost-body-info-text'>
    //             <h2>{post.title}</h2>
    //             <div className='homePost-body-info-meta'>
    //                 <time>{date.toLocaleTimeString()}{'  '}{date.toLocaleDateString()}</time>
    //             </div>
    //         </div>
    //     </div>
    //     <p className='homePost-body-description'>
    //         {post.des}
    //     </p>
    //     <div className='homePost-body-bottom'>
    //         <div className='homePost-body-bottom-tags'>
    //                 {post.tags.map((tag, i) => <Tag key={i} tag={tag}/>)}
    //         </div>
    //         <p className='homePost-body-bottom-author'>
    //            {post.author_name}
    //         </p>
    //     </div>
    //     <button className='homePost-body-read' onClick={() => navigate(`/post/${post.post_id}`)}>Continue Reading</button>
    // </div>
}
export default HomePost;