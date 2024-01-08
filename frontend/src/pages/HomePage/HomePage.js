import {useEffect, useState } from "react";
import { makeRequest } from "../../utils/requestHelpers.js";
import { defaultSolveException } from "../../utils/helpers.js";
import HomePost from "../../components/Posts/homePost/HomePost.js";
import './homePage.css'
import SideBar from "./SideBar.js";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    useEffect( () => {
        makeRequest('GET', 'POST_GET', {offset: 0, number: 3}, {'Content-Type': 'application/json'}, {credentials: 'include'})
            .then(response => {
                if (response.ok) {
                    response.json().then(result => setPosts(result.posts));
                } else {
                    defaultSolveException(response);
                }
            })
    }, [])
    const renderedPosts = posts.map((post, index) => {
        return <HomePost key={post.post_id} post={post}/>
    })
    return (
        <div className="homePage-main">
            <div className="homePage-blog-area">
                {renderedPosts}
            </div>
            <SideBar/>
        </div>
    )
}