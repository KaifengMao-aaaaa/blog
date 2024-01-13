import { useContext, useEffect } from 'react';
import './preview.css'
import quit from '../../../utils/imgs/quit.png'
import WholePost from '../../../components/Posts/wholePost/WholePost';
import { EditPageContext } from '../../../layouts/EditPageContext';
import { useNavigate } from 'react-router-dom';
const Preview = () => {
    const {post} = useContext(EditPageContext);
    const navigate = useNavigate();
    useEffect(() => {
    }, [])
    return (
        <div>

        <div className='previewDisplay-body'>
            <img className='previewDisplay-quit' onClick={() => navigate(-1)} src={quit}/>
            <div className='previewDisplay-body-container'>
                <WholePost post={post}/>
            </div>
        </div>
        </div>
    )
}
export default Preview;