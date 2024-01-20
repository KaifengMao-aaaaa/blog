import { timeStampToDate } from '../../../utils/helpers';
import binImg from '../../../utils/imgs/bin.png';
const DraftPost = ({onDelete, post, onEdit, isActived}) => {
    const draft = {active: 'bdr-solid-1 bdr-dark bg-white container-3-5-8 h-4-9 pd-3-4 font-3 font-b flex flex-col gap-3 pos-rel', inactive: 'bg-white container-3-5-8 h-4-9 pd-3-4 font-3 font-b flex flex-col gap-3 pos-rel'}
    return (
        <div className={isActived ? draft.active : draft.inactive}>
            <div className="container-full-11 hid">
                <p className='font-2 mr-bottom-2'>Draft Name</p>
                <p className='font-4'>{post.title}</p>
            </div>
            <div>
                <p className='font-1 mr-bottom-1'>Last Modified</p>
                <p className="hid font-2">{timeStampToDate(post.publish_time)}</p>
            </div>
            <div>
                <p className='font-1 mr-bottom-1'>Category</p>
                <p className="hid">{post.category}</p>
            </div>
            <button className='crs pos-br' onClick={onDelete}>
                <img className='icon-cont-xsm' src={binImg}/>
            </button>
            <button className='btn rd-2 prim-hover-sdw pd-1-5 pos-bl crs font-b font-light' onClick={onEdit}>
                Apply
            </button>
        </div>
    )
}
export default DraftPost;