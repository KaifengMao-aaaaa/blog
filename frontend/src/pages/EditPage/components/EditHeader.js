import './editHeader.css';
import { useContext } from 'react';
import { makeRequest } from '../../../utils/requestHelpers';
import { GlobalLoadingContext } from '../../../GlobalLoading';
import triangle from '../../../utils/imgs/triangle.png'
import Loading from '../../../components/Loading/Loading';
import { useNavigate } from "react-router-dom";
import Logo from "../../../components/Logo/Logo";
import { EditPageContext } from "../../../layouts/EditPageContext";
function EditHeader() {
    const {blog, setEditState, editState} = useContext(EditPageContext);
    const {globalLoading} = useContext(GlobalLoadingContext);
    const navigate = useNavigate();
    function handleSaveDraft(e) {
        makeRequest('POST', 'POST_PUBLISH', {post:{...blog, isDraft: blog.isDraft, id: localStorage.getItem('postId')}}, {'Content-Type': 'application/json'}, {credentials:'include'})
            .then(response => response.json().then(result => localStorage.setItem('postId', result.postId)));
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
                    <button onClick={() => setEditState('Publish')}>Publish</button>
                    <div className="editHeader-navbar-item-contanier">
                        <button>Save To</button>
                        <img src={triangle}/>
                    </div>
                </div>
                {/* <Link to={"/"} className={styles.logo}>
                    <img src="data:image/png;base64,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"/>
                </Link>
                <p className={styles.decorationText}>
                    {blog.title.length ? blog.title : 'New Post'}
                </p>
                <div className={styles.buttons}>
                    {editState !== 'Preview' && < button className={styles.Publish} onClick={(e) => setEditState('Preview')}>
                        Preview
                    </button>}
                    {editState !== 'Edit' && < button className={styles.Publish} onClick={(e) => setEditState('Edit')}>
                        Edit
                    </button>}
                    {editState !== 'Publish' && <button className={styles.Publish} onClick={(e) => setEditState('Publish')}>
                        Publish
                    </button>}
                    {editState !== 'DraftList' && <button className={styles.Publish} onClick={(e) => setEditState('DraftList')}>
                        DraftList
                    </button>}
                    <button className={styles.Save} onClick={handleSaveDraft}>
                        Save Draft
                    </button>
                </div> */}
            </nav>
    )
}
export default EditHeader;