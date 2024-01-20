import {useEffect, useState } from "react";
import { makeRequest } from "../../utils/requestHelpers.js";
import { defaultSolveException } from "../../utils/helpers.js";
import HomePost from "../../components/Posts/homePost/HomePost.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SymmetricalPosts from "../../components/Posts/SymmetricalPosts.js";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const {query, page, category} = useParams()
    const [postsNum, setPostsNum] = useState(0);
    const navigate = useNavigate();
    const NumPostsInPage = 10;
    const type = useLocation().pathname.split('/')[1];
    useEffect( () => {
        if (type === 'home') {
            makeRequest('GET', 'POST_PUBLICINFO', {}, {}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPostsNum(result.postsNum));
                    } 
                }
            )
            makeRequest('GET', 'POST_GET', {offset: Number(page - 1) * NumPostsInPage, number: NumPostsInPage, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPosts(result.posts));
                    }
                }
            )
        } else if (type === 'category') {
            makeRequest('GET', 'POST_GET', {offset: 0, number: 999, pattern: category, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPostsNum(result.posts.length));
                    } else {
                        defaultSolveException(response);
                    }
                }
            )
            makeRequest('GET', 'POST_GET', {offset: (Number(page) - 1) * NumPostsInPage, number: NumPostsInPage, pattern: category, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPosts(result.posts));
                    } else {
                        defaultSolveException(response);
                    }
                }
            )
        } else if (type === 'search') {
            makeRequest('GET', 'POST_GET', {offset: 0, number: 999, pattern: query, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPostsNum(result.posts.length));
                    } else {
                        defaultSolveException(response);
                    }
                }
            )
            makeRequest('GET', 'POST_GET', {offset: (Number(page) - 1) * NumPostsInPage, number: NumPostsInPage, pattern: query, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPosts(result.posts));
                    } else {
                        defaultSolveException(response);
                    }
                }
            )
        } else {
            navigate('/home/1');
        }
    }, [query, page, category])
    function handleClick(e) {
        if (e.target.id === 'next' || e.target.id === 'before') {
            let paths = window.location.pathname.split('/');
            paths[paths.length - 1] = Number(paths[paths.length - 1] - (e.target.id === 'next' ? -1 : 1))
            if (Number(paths[paths.length - 1]) < 1) {
                paths[paths.length - 1] = 1;
            } else if (Number(paths[paths.length - 1]) > (parseInt(postsNum / NumPostsInPage) + 1)) {
                paths[paths.length - 1] = (parseInt(postsNum / NumPostsInPage) + 1);
            }
            navigate(paths.join('/'))
        }
    }   
    return (
        <div className="grid-h-7-3">
            <section className="flex blk-ctr-v">
                <div className="container-26-auto">
                    <div className="flex blk-ctr-h mr-bottom-7">
                        {(type === 'home' || type === 'search') && <h2 className="font-b mr-top-4 font-4 bdr-solid-bottom-2 pd-bottom-1 bdr-dark">{query === undefined ? 'Recent Posts' : `Result For ${query}`}</h2>}
                        {type === 'category' && <h2 className="font-b mr-top-4 font-4 bdr-solid-bottom-2 pd-bottom-1 bdr-dark">{category}</h2>}
                    </div>
                    <SymmetricalPosts posts={posts}/>
                    <div className='full-w flex blk-ctr-v gap-2 h-2-5 blk-ctr-h mr-top-3'>
                        <p className='font-2 font-b'>Page {page} of {parseInt((postsNum) / NumPostsInPage) + 1}</p>
                        <button id="before" className='btn w-6-1 h-3-1 rd-2 crs prim-hover-sdw font-light' onClick={handleClick}>Before</button>
                        <button id="next" className='btn w-6-1 h-3-1 rd-2 crs prim-hover-sdw font-light' onClick={handleClick}>Next</button>
                    </div>
                </div>
            </section>
        </div>
    )
}