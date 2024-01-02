import styles from'../Css/preview.module.css';
import { useContext, useEffect } from 'react';
import { EditContext } from '../EditPage';
import Markdown from 'react-markdown';
const Preview = () => {
    const {blog, editState} = useContext(EditContext);
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
        <div className={styles.body} id='preview-body'>
            {editState !== 'Preview' && <div className={styles.preview}>
                Preview
            </div>}
            <img className={styles.bannerImg} src={blog.banner} onError={handleBannerError}/>
            <h1 className={styles.title} >{blog.title}</h1>
            <div className={styles.contentArea} id='publish-contentArea'>
                <Markdown >{blog.content}</Markdown>
            </div>
        </div>
    )
}
export default Preview;