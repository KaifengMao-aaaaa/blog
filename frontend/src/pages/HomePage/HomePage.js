import {useEffect, useState } from "react";
import { makeRequest } from "../../utils/requestHelpers.js";
import { defaultSolveException } from "../../utils/helpers.js";
import HomePost from "../../components/Posts/homePost/HomePost.js";
import './homePage.css'
import SideBar from "./SideBar.js";
import { useNavigate, useParams } from "react-router-dom";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const {query} = useParams()
    const navigate = useNavigate();
    useEffect( () => {
        if (query) {
            let variables = query.split('+');
            const wholeQuery = {
                pattern: variables.filter(v => v.startsWith('pattern='))[0],
                tag: variables.filter(v => v.startsWith('tag='))[0],
            }
            if (wholeQuery.pattern === 'pattern=' && wholeQuery.tag === 'tag=') {
                navigate('/');
            }
            for (let key of Object.keys(wholeQuery)) {
                wholeQuery[key] = wholeQuery[key].split('=')[1]
            }
            makeRequest('GET', 'POST_GET', {offset: 0, number: 3, tag: wholeQuery.tag, pattern: wholeQuery.pattern, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPosts(result.posts));
                    } else {
                        defaultSolveException(response);
                    }
                }
            )
        } else {
            makeRequest('GET', 'POST_GET', {offset: 0, number: 999, tag: '', pattern: '', is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => setPosts(result.posts));
                    } else {
                        defaultSolveException(response);
                    }
                }
            )
        }
    }, [query])
    const renderedPosts = posts.map((post, index) => {
        return <HomePost key={post.post_id} post={post}/>
    })
    return (
        <div className="homePage-main">
            <div className="homePage-blog-area">
                {renderedPosts}
                {renderedPosts.length === 0 && <h2>Not any Posts</h2>}
            </div>
            <SideBar/>
        </div>
    )
}