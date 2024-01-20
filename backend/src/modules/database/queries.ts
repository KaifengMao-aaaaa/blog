const QUERIES = {
    INSERT_USER: "INSERT INTO USERS (id, name, password) VALUES ($1, $2, $3)",
    INSERT_TOKEN: "INSERT INTO GET_TOKEN (user_id, token) VALUES ($1, $2)",
    INSERT_POST: "INSERT INTO POSTS (id, title, banner, content, des, author, is_draft, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    INSERT_TAG: 'INSERT INTO HAVE_TAG (post_id, name) VALUES ($1, $2)',
    SELECT_USER: {
        BY_ID: "SELECT * FROM USERS WHERE id = $1",
        BY_USERNAME: "SELECT * FROM USERS WHERE name = $1"
    },
    SELECT_POST: {
        SELECT_NUMBER_POSTS: "SELECT p.id as post_Id, title, banner, content, des, u.name as author, publish_Time FROM POSTS p JOIN USERS u ON u.id = p.author WHERE p.is_draft = false ORDER BY PUBLISH_TIME LIMIT $1 OFFSET $2",
        SELECT_NUMBER_DRAFTS: "SELECT p.id as post_Id, title, banner, content, des, u.name as author, publish_Time FROM POSTS p JOIN USERS u ON u.id = p.author WHERE p.is_draft = true ORDER BY PUBLISH_TIME LIMIT $1 OFFSET $2",
        SELECT_ONE_POST: "SELECT p.id, p.title, p.banner, p.content, p.des, p.author, p.is_draft, p.publish_time , string_agg(h.name, ',') as tags FROM posts p LEFT JOIN HAVE_TAG h ON p.id = h.post_id LEFT JOIN USERS u ON u.id = p.author WHERE p.id = $1 GROUP BY p.id",
        BY_AUTHOR: "SELECT p.id, p.title, p.banner, p.content, p.des, p.author, p.is_draft, p.publish_time , string_agg(h.name, ',') as tags FROM posts p LEFT JOIN HAVE_TAG h ON p.id = h.post_id LEFT JOIN USERS u ON u.id = p.author WHERE p.author = $1"
    },
    REMOVE_TOKEN: "DELETE FROM GET_TOKEN WHERE user_id = $1 and token = $2",
    REMOVE_POST: "DELETE FROM POSTS WHERE id = $1",
    UPDATE_POST: "UPDATE POSTS SET title = $1, banner = $2, content = $3, des = $4, author = $5, is_draft = $6, category = $7 WHERE id = $8",
    REMOVE_DRAFT: 'DELETE FROM POSTS WHERE id = $1' 
}
export default QUERIES;