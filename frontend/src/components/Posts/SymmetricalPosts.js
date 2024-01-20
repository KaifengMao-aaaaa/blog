import HomePost from "./homePost/HomePost";

const SymmetricalPosts = ({posts}) => {
    const renderedPosts = renderPosts(posts);
    return (
        <div>
            {renderedPosts.length !== 0 && <div className="bdr-solid-thin bdr-dark-light pd-9-0">
                {renderedPosts}
            </div>}
            {renderedPosts.length === 0 && <h2 className="font-3">Not any Posts</h2>}
        </div>
    )
};
function renderPosts (posts) {
    let p = []
    for (let i = 0; i < posts.length; i += 2) {
        p.push(<div key={i} className="grid-h-1-1 pd-0-4 gap-2">
            <HomePost key={i} post={posts[i]}/>
            {i + 1 < posts.length && <HomePost key={i + 1} post={posts[i+1]}/>}
        </div>)
    }
    return p;
}
export default SymmetricalPosts;