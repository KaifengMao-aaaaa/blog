import './editHeader.css';
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
    const {post,setPost, wholeQuery} = useContext(EditPageContext);
    const {globalLoading} = useContext(GlobalLoadingContext);
    const {userInfo} = useContext(UserContext);
    const navigate = useNavigate();
    function handleSaveDraft(e) {
        makeRequest('POST', 'POST_PUBLISH', {post:{...post, is_draft: true, author: userInfo.userId}}, {'Content-Type': 'application/json'}, {credentials:'include'})
        alert('Save sucessfully')
        localStorage.removeItem('post')
        navigate('/');
    }
    if (!globalLoading.editContextLoading) {
        return <Loading/>;
    }
    return (
            <nav className='editHeader-navbar'>
                <div className="editHeader-navbar-left" onClick={() => navigate('/')}>
                    <Logo fontSize={25} color={'white'}/>
                </div>
                <div className="editHeader-navbar-right">
                    {localStorage.getItem('post') && <div className='editHeader-navbar-item-contanier'>
                        <button onClick={() => {localStorage.removeItem('post'); setPost(postStructure)}}>Restart</button>
                        <img src={restartImg}/>
                    </div>}
                    {wholeQuery.editState !== 'main' && <button onClick={() => navigate(`/edit/editState=publish+post_id=${wholeQuery.post_id}`)}>Publish</button>}
                    {wholeQuery.editState !== 'main' && <div className="editHeader-navbar-item-contanier">
                        <button onClick={handleSaveDraft}>Save</button>
                    </div>}
                    {wholeQuery.editState !== 'edit' &&<div className="editHeader-navbar-item-contanier">
                        <button onClick={() => navigate(`/edit/editState=edit+post_id=${wholeQuery.post_id}`)}>Edit</button>
                        <img src={editImg}/>
                    </div>}
                    {wholeQuery.editState !== 'main' && <div className='editHeader-navbar-item-contanier'>
                        <button onClick={() => navigate(`/edit/editState=main+post_id=${wholeQuery.post_id}`)}>Draft</button>
                        <img src={draftImg}/>
                    </div>}
                </div>
            </nav>
    )
}
export default EditHeader;