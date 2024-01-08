import styles from'../Css/preview.module.css';
import { useContext, useEffect } from 'react';
import './preview.css'
import quit from '../../../utils/imgs/quit.png'
import WholePost from '../../../components/Posts/wholePost/WholePost';
import { EditPageContext } from '../../../layouts/EditPageContext';
const Preview = () => {
    const {blog, editState, setEditState} = useContext(EditPageContext);
    useEffect(() => {
        if (editState === 'Edit') {
            const contentArea = document.getElementById('publish-contentArea');
            contentArea.className = styles.editContentArea;
            const body = document.getElementById('preview-body')
            body.className = styles.editBody;
        }
    }, [])
    function handleBannerError(e) {
        e.target.src = 'https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png'
    }
    return (
        // <div className={styles.body} id='preview-body'>
        //     {editState !== 'Preview' && <div className={styles.preview}>
        //         Preview
        //     </div>}
        //     <img className={styles.bannerImg} src={blog.banner} onError={handleBannerError}/>
        //     <h1 className={styles.title} >{blog.title}</h1>
        //     <div className={styles.contentArea} id='publish-contentArea'>
        //         <Markdown >{blog.content}</Markdown>
        //     </div>
        // </div>
        <div>

        <div className='previewDisplay-body'>
            <img className='previewDisplay-quit' onClick={() => setEditState('Edit')} src={quit}/>
            <div className='previewDisplay-body-container'>
                <WholePost post={blog}/>
            </div>
        </div>
        </div>
    )
}
export default Preview;