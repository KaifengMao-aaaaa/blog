import { useState } from 'react';
import profileIconImg from '../../utils/imgs/profile.png'
import LinkIcon from '../../utils/imgs/linkIcon.png'
import arrowImg from '../../utils/imgs/arrow.png';
import timeSpanImg from '../../utils/imgs/timeSpan.png'
import { timeStampToDate } from '../../utils/helpers';
import TableRow from './TableRow';
import {marked} from 'marked';
export default function Post({post, isPreview}) {

    const [isOpenTable, setIsOpenTable] = useState(false);
    const tableStyle = isOpenTable ? 'pd-0-4 container-full-5 gap-1 bg-black blk-ctr-h flex crs' : 'mr-6-0 pd-0-4 container-full-5 rd-1 gap-1 bg-black blk-ctr-h flex crs'; 
    function handleClickTable(e) {
        setIsOpenTable(prev => !prev);
    }
    const contentComponents = markdownToComponent(post.content)
    return (
            <div className="pd-0-12">
                <h1 className="font-t font-7">{post.title}</h1>
                {!isPreview && <div>
                    <div className="container-full-7 flex blk-ctr-l gap-3">
                        <div className="flex blk-ctr-h gap-1">
                            <img className="icon-cont-xsm" src={profileIconImg}/>
                            <p className="crs dt-hover-sdw font-2">{post.author_name}</p>
                        </div>
                        <div className="flex blk-ctr-h gap-1">
                            <img className="icon-cont-xsm" src={timeSpanImg}/>
                            <p className="font-2 font-b">{timeStampToDate(post.publish_time)}</p>
                        </div>
                    </div>
                    <div className={tableStyle} onClick={handleClickTable}>
                        {isOpenTable ? <img className="w-1-2 rotate-90" src={arrowImg}/> : <img className="w-1-2 auto-h" src={arrowImg}/>}
                        <p className="font-light font-b">Table of Contents</p>
                    </div>
                    {isOpenTable && <div className="container-full-auto bg-dark pd-0-2 blk-ctr-l">
                        <TableRow content={post.content}/>
                    </div> }
                    <section className="flex-wr font-2 font-h-10 font-b full-w mr-bottom-10">
                        {!post.des ? `There is not description` : post.des}
                    </section>
                </div>}
                <section>
                    {contentComponents}
                </section>
            </div>
    )
}
function markdownToComponent(content) {
    const html = marked(content);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const elements = doc.body.childNodes;
    const H_nums = {
        H1: 0,
        H2: 0,
        H3: 0,
        H4: 0,
        H5: 0,
        H6 : 0
    }
    const contentComponents = Array.from(elements).map((node, index) => {

        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.nodeName)) {
            H_nums[node.nodeName] += 1;
        }
        const id = `${node.nodeName}-${H_nums[node.nodeName]}`;
        const key = `element-${index}`
        switch (node.nodeName) {
            case 'H1':
            case 'H2':
                return <h2 className='mr-bottom-9 font-6 font-t mr-top-20' key={key} id={id} dangerouslySetInnerHTML={{__html: node.innerHTML}}/>
            case 'H3':
                return <h4 className='mr-bottom-9 font-4 font-t mr-top-20' key={key} id={id} dangerouslySetInnerHTML={{ __html: node.innerHTML }} />;
            case 'H4':
                return <h4 className='mr-bottom-9 font-4 font-t mr-top-20' key={key} id={id} dangerouslySetInnerHTML={{ __html: node.innerHTML }} />;
            case 'H5':
            case 'H6':
                return <h4 className='mr-bottom-9 font-4 font-t mr-top-20' key={key} id={id} dangerouslySetInnerHTML={{ __html: node.innerHTML }} />;
            case 'P':
                return <p className='font-3 font-b mr-bottom-8 font-h-10' key={key} dangerouslySetInnerHTML={{ __html: node.innerHTML }} />;
            default:
                return null;
            }
        });
        return contentComponents;
}