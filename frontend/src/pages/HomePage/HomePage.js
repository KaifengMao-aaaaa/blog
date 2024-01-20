import {useEffect, useState } from "react";
import { makeRequest } from "../../utils/requestHelpers.js";
import { defaultSolveException } from "../../utils/helpers.js";
import HomePost from "../../components/Posts/homePost/HomePost.js";
import { useNavigate, useParams } from "react-router-dom";
import SymmetricalPosts from "../../components/Posts/SymmetricalPosts.js";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const {query, page} = useParams()
    const [postsNum, setPostsNum] = useState(0);
    const navigate = useNavigate();
    if (Number(page) <= 0 || Number(parseInt(postsNum / 10) + 1) < Number(page)) {
        navigate('/1');
    }
    useEffect( () => {

        makeRequest('GET', 'POST_GET', {offset: 0, number: 999, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
            .then(response => {
                if (response.ok) {
                    response.json().then(result => setPostsNum(result.posts.length));
                } else {
                    defaultSolveException(response);
                }
            }
        )
        if (query) {
            const pattern = query;
            makeRequest('GET', 'POST_GET', {offset: 0, number: 3, pattern: pattern, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPosts(result.posts));
                    } else {
                        defaultSolveException(response);
                    }
                }
            )
        } else if (page)  {

            makeRequest('GET', 'POST_GET', {offset: Number(page - 1) * 10, number: 10, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPosts(result.posts));
                    } else {
                        defaultSolveException(response);
                    }
                }
            )
        }
    }, [query, page])
    return (
        <div className="grid-h-7-3">
            <section className="flex blk-ctr-v">
                <div className="container-26-auto">
                    <div className="flex blk-ctr-h mr-bottom-7">
                        <h2 className="font-b mr-top-4 font-4 bdr-solid-bottom-2 pd-bottom-1 bdr-dark">{query === undefined ? 'Recent Posts' : `Result For ${query}`}</h2>
                    </div>
                    <SymmetricalPosts posts={posts}/>
                    <div className='full-w flex blk-ctr-v gap-2 h-2-5 blk-ctr-h mr-top-3'>
                        <p className='font-2 font-b'>Page {page} of {parseInt((postsNum) / 10) + 1}</p>
                        <button className='btn w-6-1 h-3-1 rd-2 crs prim-hover-sdw font-light' onClick={() => navigate(page !==  '1' ? `/${Number(page) - 1}` : '')}>Before</button>
                        <button className='btn w-6-1 h-3-1 rd-2 crs prim-hover-sdw font-light' onClick={() => navigate(page !== `${parseInt(postsNum / 10) + 1}` ? `/${Number(page) + 1}`: '')}>Next</button>
                    </div>
                </div>
            </section>
        </div>
    )
}