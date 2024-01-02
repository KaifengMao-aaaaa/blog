import styles from '../Css/edit.module.css';
import { useContext, useEffect } from "react";
import { EditContext } from "../EditPage";
import { makeRequest } from '../../../utils/requestHelpers';
import { UserContext } from '../../../UserContext';
import { GlobalLoadingContext } from '../../../GlobalLoading';
import Loading from '../../../components/Loading/Loading';
import { defaultSolveException } from '../../../utils/helpers';
const Edit = () => {
    const {blog, setBlog, editState} = useContext(EditContext);
    const {userInfo} = useContext(UserContext);
    const {globalLoading} = useContext(GlobalLoadingContext)
    useEffect(() => {
        if (globalLoading.editContextLoading) {
            if (editState === 'Edit') {
                const currentElement = document.getElementById('blogEditor-body');
                currentElement.className = styles.editBody;
                const side = document.getElementById('blogEditor-contentArea');
                side.className = styles.editBodyArea;
                const intervalId = setInterval(() => {
                    saveDraft();
                }, 5000);
                return () => {
                    clearInterval(intervalId);
                }
            }
        }
    }, [blog])
    function handleUpload(e) {
        const img = e.target.files[0];
        if (img) {
            const url = URL.createObjectURL(img);
            setBlog({...blog, banner: url});
            const width = img.width;
            const section = document.getElementById('blogEditor-displayArea');
            if (section) {
                section.style.width = width;
            }
        }
    }
    function saveDraft() {
        makeRequest('POST', 'POST_PUBLISH', {post:{...blog, isDraft: blog.isDraft, id: localStorage.getItem('postId'), author: userInfo.userId}}, {'Content-Type': 'application/json'}, {credentials:'include'})
            .then(response => {
                if (response.ok) {
                    response.json().then(result => localStorage.setItem('postId', result.postId))
                } else {
                   defaultSolveException(response); 
                }
            });
    }
    function handleContentChange(e) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + window.screen.height / 2 + 'px';
        setBlog({...blog, content: e.target.value});
    }
    function handleBannerError(e) {
        e.target.src = 'https://soliloquywp.com/wp-content/uploads/2016/08/How-to-Set-a-Default-Featured-Image-in-WordPress.png'
    }
    function handleTitleChange(e) {
        e.target.style.height = e.target.scrollHeight  + 'px';
        setBlog({...blog, title: e.target.value});
    }
    function handleTitleKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }
    if (!globalLoading.editContextLoading) {
        return <Loading/>;
    }
    return (
        <div className={styles.body} id="blogEditor-body">
                <div className={styles.sourceCode}>
                    Source Code
                </div>
                <div className={styles.imgArea}>
                    <label htmlFor="blogEditor-uploadBanner">
                        <img className={styles.bannerImg} src={blog.banner} onError={handleBannerError}/>
                        <input
                            id="blogEditor-uploadBanner"
                            type="file"
                            hidden
                            onChange={handleUpload}
                            accept=".pdf, .jpg, .jpeg"
                        />
                    </label>
                </div>
                <textarea 
                    className={styles.titleArea} 
                    value={blog.title}
                    placeholder="Post Title"
                    onChange={handleTitleChange}
                    onKeyDown={handleTitleKeyDown}
                >
                </textarea>
                <textarea
                    id = 'blogEditor-contentArea'
                    className={styles.contentArea}
                    value={blog.content}
                    placeholder="Add Some Content"    
                    onChange={handleContentChange}
                >
                </textarea>
        </div>
    )
}
export default Edit;