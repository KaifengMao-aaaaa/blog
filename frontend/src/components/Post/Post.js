import { Navigate } from 'react-router-dom';
import styles from './post.module.css';
import { useState } from 'react';
export default function Post({post}) {
    const date = new Date(post.publish_time);
    const [direct, setDirect] = useState(false)
    function handleClick(e) {
        setDirect(true);
    }
    if (direct) {
        return <Navigate to={`/post/${post.post_id}`}/>
    }
    return (
        <div className={styles.post} onClick={handleClick}>
            <div className="image">
                <img src="https://images.ctfassets.net/hrltx12pl8hq/vfJfws5pq5PK8xSX6I1bV/d542f5862da3701e2afe687e9efbeff6/hero-image-robot-.jpg?fit=fill&w=1200&h=675&fm=webp" alt=""/>
            </div>
            <div className={styles.texts}>
                <h2>{post.title}</h2>
                <p className={styles.info}>
                    <a href="" className={styles.author}>{post.author}</a>
                    <time>{date.toLocaleTimeString()}{'  '}{date.toLocaleDateString()}</time>
                </p>
                <p className={styles.summary}>{post.des}</p>
            </div>
      </div>
    )
}