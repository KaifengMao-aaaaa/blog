import styles from './tag.module.css'
import closeIcon from './close.png';
import { useContext } from 'react';
import { EditContext } from '../../pages/EditPage/EditPage';
function Tag({tag}) {
    const {blog, setBlog} = useContext(EditContext);
    function handleClickTag(e) {
        setBlog({...blog, tags: blog.tags.filter(t => tag !== t)});
    }
    return (<div className={styles.tag}>
        {tag}
        <button onClick={handleClickTag}>
            <img src={closeIcon} />
        </button>
    </div>)
}
export default Tag;