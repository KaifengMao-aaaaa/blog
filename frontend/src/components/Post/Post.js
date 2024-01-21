import { useState } from 'react';
import profileIconImg from '../../utils/imgs/profile.png'
import arrowImg from '../../utils/imgs/arrow.png';
import timeSpanImg from '../../utils/imgs/timeSpan.png'
import { timeStampToDate } from '../../utils/helpers';
import TableRow from './TableRow';
import {marked} from 'marked';
export default function Post({post, isPreview}) {

    const [isOpenTable, setIsOpenTable] = useState(false);
    const tableStyle = isOpenTable ? 'pd-0-4 container-full-5 gap-1 bg-green blk-ctr-h flex crs' : 'mr-6-0 pd-0-4 container-full-5 rd-1 gap-1 bg-green blk-ctr-h flex crs'; 
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
    console.log(html)
    const contentComponents = renderHtml(html);
        return <div className='markdown'>
            {contentComponents}
        </div>;
}

function renderHtml(html) {
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
        const id = `${node.nodeName}-${H_nums[node.nodeName] + 1}`;
        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(node.nodeName)) {
            H_nums[node.nodeName] += 1;
        }
        switch (node.nodeName) {
            case 'H1':
                return <h1 key={index} id={id}>{node.textContent}</h1>
            case 'H2':
                return <h2 key={index}  id={id}>{node.textContent}</h2>
            case 'H3':
                return <h3 key={index}  id={id}>{node.textContent}</h3>
            case 'H4':
                return <h4 key={index}  id={id}>{node.textContent}</h4>
            case 'H5':
                return <h5 key={index}  id={id}>{node.textContent}</h5>
            case 'H6':
                return <h6 key={index}  id={id}>{node.textContent}</h6>
            case 'HR':
                return <hr key={index}/>;
            default:
                return renderNode(node);
            }
    });
    return contentComponents
}
function renderNode(node) {
    const Type = node.nodeName.toLowerCase();
    switch (node.nodeName) {
        case 'UL':
        case 'OL':
        case 'CODE': 
        case 'PRE':
        case 'P':
        case 'HR':
        case 'BLOCKQUOTE':
        case 'STRONG':
        case 'EM': 
        case 'LI':
            return <Type>{renderChildren(node)}</Type>
        default:
            return node.textContent;
    }
}

function renderChildren(node) {
    return Array.from(node.childNodes).map((child, index) => {
        return renderNode(child);
    });
}


