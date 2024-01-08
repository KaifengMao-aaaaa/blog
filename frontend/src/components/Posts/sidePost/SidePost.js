import './sidePost.css'
import Img from '../homePost/config.png'
const SidePost = () => {
    return <div className='sidePost-body'>
        <img src={Img}/>
        <div className='sidePost-body-texts'>
            <h3>it is header is not 2 line so l add need more so l have to add tow workds for more lines to show</h3>
            <div>
                <p>author</p>
                <time>author</time>
            </div>
        </div>
    </div>
}
export default SidePost;