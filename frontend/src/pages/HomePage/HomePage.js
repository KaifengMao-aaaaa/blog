import { useContext, useEffect, useState } from "react";
import Post from "../../components/Post/Post.js";
import { makeRequest } from "../../utils/requestHelpers.js";
import { useNavigate } from "react-router-dom";
import { GlobalLoadingContext } from "../../GlobalLoading.js";
import Loading from "../../components/Loading/Loading.js";
import { defaultSolveException } from "../../utils/helpers.js";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const {globalLoading} = useContext(GlobalLoadingContext);
    const navigate = useNavigate();
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
    if (!globalLoading.userContextLoading) {
        return <Loading/>
    }
    const renderedPosts = posts.map((post, index) => {
        return <Post key={post.post_id} post={post}/>
    })
    return (
        <div>
            {renderedPosts}
        </div>
    )
}