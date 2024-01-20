import {marked} from 'marked';
const TableRow = ({content}) => {
    // let regexString = `(?=\\n${'#'.repeat(level)} [^\\#])`;
    // let regex = new RegExp(regexString);
    // let splitText = content.split(regex);
    // if (level === 5 || content === '') {
    //     return;
    // }
    // if (splitText.length > 1) {
    //     splitText = splitText.map(text => text.trim());
    // }
    // console.log(splitText)
    // console.log(level)
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
        const level = parseInt(node.nodeName.substring(1));
        if (isNaN(level) || level < 1 || level > 6) {
            return null;
        }
        const pd = (level - 1) * 3;
        switch (node.nodeName) {
            case 'H1':
            case 'H2':
            case 'H3':
            case 'H4':
            case 'H5':
            case 'H6': 
                return <a href={`#${node.nodeName}-${H_nums[node.nodeName]}`} className={`pd-left-${pd} font-3 font-b mr-bottom-3 mr-top-3 hover-ul`} key={key}>{node.textContent}</a>;
            default:
                return null;
            }
    });
    return (<div className='flex flex-col bg-grey pd-3-3'>
        {contentComponents}
    </div>) 
    // return (
    //     // <div>
    //     //     {
    //     //         splitText.map((text, index) => {
    //     //             return <div className="pd-left-3 font-3 font-b mr-bottom-3 mr-top-3"> 
    //     //                 <a href={`#H${level}-${index + 1}`}>{text.split('\n')[0].slice(level + 1)}</a>
    //     //                 <TableRow key={index} content={text.split('\n').slice(1).join('\n')} level={level + 1}/>
    //     //             </div>

    //     //         })
    //     //     } 
    //     // </div>
    // )
}
export default TableRow;