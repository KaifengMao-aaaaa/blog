import { useContext } from 'react';
import { makeRequest } from '../../../utils/requestHelpers';
import { GlobalLoadingContext } from '../../../GlobalLoading';
import draftImg from '../../../utils/imgs/draft.png'
import restartImg from '../../../utils/imgs/restart.png'
import Loading from '../../../components/Loading/Loading';
import { useNavigate } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import editImg from '../../../utils/imgs/edit.png'
import { EditPageContext, postStructure } from "../../../layouts/EditPageContext";
import { UserContext } from '../../../UserContext';
function EditHeader() {
    const {post,setPost, wholeQuery, setIsOpenDrafts} = useContext(EditPageContext);
    const {globalLoading} = useContext(GlobalLoadingContext);
    const {userInfo} = useContext(UserContext);
    const navigate = useNavigate();
    function handleSaveDraft(e) {
        makeRequest('POST', 'POST_PUBLISH', {post:{...post, is_draft: true, author: userInfo.userId}}, {'Content-Type': 'application/json'}, {credentials:'include'})
        alert('Save sucessfully')
        localStorage.removeItem('post')
    }
    if (!globalLoading.editContextLoading) {
        return <Loading/>;
    }
    return (
        <nav className='container-full-7 flex flex-be bg-black pd-0-9 blk-ctr-h'>
            <button className='crs' onClick={() => navigate('/1')}>
                <Logo fontSize={25} color={'white'}/>
            </button>
            <div className='flex blk-ctr-h gap-3'>
                {localStorage.getItem('post') && <div className='flex blk-ctr-h'>
                    <button className='font-light crs' onClick={() => {localStorage.removeItem('post'); setPost(postStructure); console.log(post)}}>Restart</button>
                    <img className='icon-cont-xsm' src={restartImg}/>
                </div>}
                {wholeQuery.editState !== 'main' && <button className='font-light crs' onClick={() => navigate(`/edit/editState=publish+post_id=${wholeQuery.post_id}`)}>Publish</button>}
                {wholeQuery.editState !== 'main' && <div>
                    <button className='font-light crs' onClick={handleSaveDraft}>Save</button>
                </div>}
                {wholeQuery.editState !== 'edit' &&<div className="editHeader-navbar-item-contanier">
                    <button className='font-light crs' onClick={() => navigate(`/edit/editState=edit+post_id=${wholeQuery.post_id}`)}>Edit</button>
                    <img className='icon-cont-xsm'src={editImg}/>
                </div>}
                {wholeQuery.editState !== 'main' && <div className='flex blk-ctr-h'>
                    <button className='font-light crs' onClick={() => setIsOpenDrafts(prev => !prev)}>Draft</button>
                    <img className='icon-cont-xsm' src={draftImg}/>
                </div>}
            </div>
        </nav>
    )
}
export default EditHeader;