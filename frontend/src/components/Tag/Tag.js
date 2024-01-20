import closeIcon from './close.png';
function Tag({tag, isEdit, onDelete}) {
    const styles = {
        edit: 'bg-white pd-1-5 font-2 flex blk-ctr container-auto-5 rd-1 blk-ctr-h',
        preview: 'bg-light-green font-dark-dark pd-1-5 font-2 flex blk-ctr container-auto-5 rd-1 blk-ctr-'
    }
    return (<div className={isEdit ? styles.edit : styles.preview}>
        <p className='font-b font-2'>
            {tag}
        </p>
        {isEdit && <button className='crs' onClick={onDelete}>
            <img src={closeIcon} className='icon-cont-xxsm' />
        </button>}
    </div>)
}
export default Tag;