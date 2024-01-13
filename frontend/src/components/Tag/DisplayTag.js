import styles from './tag.module.css'
import { useContext } from 'react';
import { EditPageContext } from '../../layouts/EditPageContext';
function DisplayTag({tag}) {
    const {blog, setBlog} = useContext(EditPageContext);
    return (<div className={styles.tag}>
        {tag}
    </div>)
}
export default DisplayTag;