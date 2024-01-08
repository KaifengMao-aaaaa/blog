import SidePost from '../../components/Posts/sidePost/SidePost';
import './sideBar.css'
const SideBar = () => {
    return <div className="sideBar-body">
        <div className='sideBar-body-divider'>
            <p>Recent posts</p>
            <div></div>
        </div>
        <div>
            <SidePost/>
        </div>
        <div className='sideBar-body-divider'>
            <p>Tags Cloud</p>
            <div></div>
        </div>
    </div>
}
export default SideBar;