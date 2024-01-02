import { useContext, useState } from 'react';
import styles from '../Css/draftPost.module.css';
import { EditContext } from '../EditPage';
import { Navigate } from 'react-router-dom';
export default function DraftPost({post}) {
    const date = new Date(post.publish_time);
    const {setBlog, setEditState} = useContext(EditContext);
    const [direct, setDirect] = useState(null);
    function handleClick(e) {
        setDirect(`/edit/${post.post_id}`)
        setEditState('Edit');
    }
    if (direct) {
        return <Navigate to={direct}/>;
    }
    return (
        <div className={styles.post}>
            <div className={styles.bannerArea}>
                <img src='https://images.ctfassets.net/hrltx12pl8hq/vfJfws5pq5PK8xSX6I1bV/d542f5862da3701e2afe687e9efbeff6/hero-image-robot-.jpg?fit=fill&w=1200&h=675&fm=webp'/>
            </div>
            <div className={styles.textsArea}>
                <h2 className={styles.titleArea}>{post.title}</h2>
                <p className={styles.labelArea}>{`Last Modified: ${date.toLocaleTimeString() +'  '+ date.toLocaleDateString()}`}</p>
                <button className={styles.buttonArea} onClick={handleClick}>Continue Edit</button>
                <div></div>
            </div>
        </div>
    )
}