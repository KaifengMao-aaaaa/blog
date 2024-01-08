import SquarePost from '../../components/Posts/squarePost/SquarePost';
import './profilePage.css'
import { blogStructure } from '../../utils/blogSimple';
const ProfilePage = () => {
    return (<div className='profilePage-main'>
        <div className='profilePage-main-introduction'>
            <h2>Jonathan Doe</h2>
            <div className='profilePage-main-statistic'>
                <div className='profilePage-main-statistic-container'>
                    <p className='profilePage-main-statistic-container-key'>Number of Posts</p>
                    <p className='profilePage-main-statistic-container-value'>
                        30
                    </p>
                </div>
            </div>
        </div>
        <div className='profilePage-main-body'>
            <SquarePost post={blogStructure}/>
            <SquarePost post={blogStructure}/>
            <SquarePost post={blogStructure}/>
            <SquarePost post={blogStructure}/>
        </div>
        <div className='profilePage-main-bottom'>
            <p>Page 1 of 2</p>
            <button>Before</button>
            <button>Next</button>
        </div>
    </div>)
};
export default ProfilePage;