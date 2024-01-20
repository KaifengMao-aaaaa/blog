import { useContext, useEffect, useState } from 'react';
import { makeRequest } from '../../utils/requestHelpers';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import SymmetricalPosts from '../../components/Posts/SymmetricalPosts';
const ProfilePage = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const {userInfo} = useContext(UserContext);
    const [postsNum, setPostNum] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        async function getPosts(author) {
            let response = await makeRequest('GET', 'POST_GET', {author, offset: offset, number: 8, is_draft: false, author},{'Content-Type': 'application/json'}, {credentials: 'include'})
            let response2 = await makeRequest('GET', 'POST_GET', {author, offset: 0, number: 999, is_draft: false},{'Content-Type': 'application/json'}, {credentials: 'include'})
            if (response.ok && response2.ok) {
                response = await response.json();
                response2 = await response2.json();
                setAllPosts(response.posts);
                setPostNum(response2.posts.length);
            }
        } 
        getPosts(userInfo.userId);
    }, [offset])
    return (<div className='mr-top-3 container-full-auto flex flex-col blk-ctr-h gap-3'>
        <div className='container-13-3-10 pd-3-6 sdw-tb-light'>
            <p className='font-4 '>{localStorage.getItem('username')}</p>
            <div className='flex flex-col blk-ctr gap-2'>
                <p className='font-4 font-b'>Post Number</p>
                <p className='pd-7-7 bg-green font-light tet-ctr font-7'>{postsNum}</p>
            </div>
        </div>
        <div className='auto-h w-8-9'>
            <p className='font-4 font-b mr-bottom-4'>{'My Posts'}</p>
            <div className='full-w auto grid-h-4-2 flex-wr mr-bottom-20'>
                {allPosts.length === 0 ? <h2 className='font-b font-2'>No Any Post</h2> :
                <div className='flex flex-col'>
                    {<SymmetricalPosts posts={allPosts}/>}
                    <div className='full-w flex blk-ctr-v gap-2 full-h blk-ctr-h mr-top-3'>
                        <p className='font-2 font-b'>Page {parseInt(offset / 8) + 1} of {parseInt((postsNum) / 9) + 1}</p>
                        <button className='btn w-6-1 h-3-1 rd-2 crs prim-hover-sdw font-light' onClick={() => setOffset((prev) => prev >= 8 ? prev - 8 : prev)}>Before</button>
                        <button className='btn w-6-1 h-3-1 rd-2 crs prim-hover-sdw font-light' onClick={() => setOffset((prev) => prev + 8 < postsNum ? prev + 8 : prev)}>Next</button>
                    </div>
                </div>}
                <div className='pd-3-3 flex blk-ctr-v'>
                    <div className='container-4-9-8 bg-black'>

                    </div>
                </div>
            </div>
        </div>
    </div>)
};
export default ProfilePage;