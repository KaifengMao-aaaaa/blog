import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../utils/requestHelpers";
import { defaultSolveException } from "../../utils/helpers";
import SymmetricalPosts from "../../components/Posts/SymmetricalPosts";

const CategoryPage = () => {
    const {category} = useParams();
    const [posts, setPosts] = useState([]);
    useEffect( () => {
        makeRequest('GET', 'POST_GET', {offset: 0, number: 999, category, is_draft: false}, {'Content-Type': 'application/json'}, {credentials: 'include'})
            .then(response => {
                if (response.ok) {
                    response.json().then(result => setPosts(result.posts));
                } else {
                    defaultSolveException(response);
                }
            }
        )
    }, [category])
    return (
        <div className="grid-h-7-3">
            <section className="flex blk-ctr-v">
                <div className="container-26-auto">
                    <div className="flex blk-ctr-h mr-bottom-7">
                        <h2 className="font-b mr-top-4 font-4 bdr-solid-bottom-2 pd-bottom-1 bdr-dark">{category}</h2>
                    </div>
                    <SymmetricalPosts posts={posts}/>
                </div>
            </section>
        </div>
    )
}
export default CategoryPage;