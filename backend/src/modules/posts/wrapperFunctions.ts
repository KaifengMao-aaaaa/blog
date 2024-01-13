import {Request, Response, query} from "express";
import db from '../database/db';
import dbQuery from '../database/queries';
async function publish(req: Request, res: Response) {
    try {
        const post = req.body.post;
        let postId = post.post_id;
        if (!postId) {
            postId =  Number(String(Math.floor(Math.random() * 100000)) + String(Math.floor(Math.random() * 10000)));
            db.queryPool(dbQuery.INSERT_POST, [postId, post.title, post.banner, post.content, post.des, post.author, post.is_draft]);
        } else {
            db.queryPool(dbQuery.UPDATE_POST, [post.title, post.banner, post.content, post.des, post.author,post.is_draft, postId]);
        }
        db.queryPool("DELETE FROM have_tag where post_id = $1", [postId]);
        for (const tag of post.tags) {
            db.queryPool(dbQuery.INSERT_TAG, [postId, tag]);
        }
        res.json({postId});
    } catch (e) {
        console.log('error');
    }
}
async function toDraft(req: Request, res: Response) {
    try {
        const post_id = req.body.post_id;
        db.queryPool('UPDATE posts SET is_draft = true WHERE id = $1', [post_id]);
        res.json({});
    } catch (e) {
        console.log('error');
    }
}
async function get(req: Request, res: Response) {
    try {
        let {number, offset, tag, post_id, pattern, order_by, is_draft, author} = req.query;
        if (offset === undefined || offset === '' || offset === 'undefined') {
            offset = '0';
        }
        if (number === undefined || number === '' || number === 'undefined') {
            number = '999';
        }
        const validColumns = ['undefined', 'post_id', 'title', 'content', 'des', 'author_name', 'publish_time'];
        if (!(validColumns.filter(column => String(order_by).startsWith(column)).length === 1)) {
            return res.json({err: 'Invalid column name'}).status(403);
        }
        let posts;
        posts = await db.queryPool(`SELECT * FROM getPosts g order by ${order_by === undefined || order_by === '' || order_by === 'undefined' ? 'post_id' : order_by} LIMIT $1 OFFSET $2`, [Number(number), Number(offset),])
        posts.rows.forEach(post => {
            if (post.tags) {
                post.tags = post.tags.split(',')
            } else {
                post.tags = [];
            }
        })
        if (post_id !== undefined && post_id !== '' && post_id !== 'undefined') {
            const tmp = await db.queryPool('SELECT * FROM getPosts g where g.post_id = $1 ', [Number(post_id)]);
            posts.rows = posts.rows.filter(post => tmp.rows.map(tmpPost => tmpPost.post_id).includes(post.post_id))
        } 
        if (pattern !== undefined && pattern !== '' && pattern !== 'undefined') {
            const tmp = await db.queryPool('SELECT * FROM getPostsWithPattern($1)', [String(pattern)]);
            posts.rows = posts.rows.filter(post => tmp.rows.map(tmpPost => tmpPost.post_id).includes(post.post_id))
        } 
        if (is_draft !== undefined && is_draft !== '' && is_draft !== 'undefined') {
            const tmp = await db.queryPool('SELECT * FROM getPosts g where g.is_draft = $1', [String(is_draft)]);
            posts.rows = posts.rows.filter(post => tmp.rows.map(tmpPost => tmpPost.post_id).includes(post.post_id))
        }
        if (author !== undefined && author !== '' && author !== 'undefined') {
            const tmp = await db.queryPool('SELECT * FROM getPosts g where g.author = $1', [Number(author)]);
            posts.rows = posts.rows.filter(post => tmp.rows.map(tmpPost => tmpPost.post_id).includes(post.post_id))
        }
        if (tag !== undefined && tag !== '' && tag !== 'undefined') {
            const tmp = await db.queryPool('SELECT * FROM getPostsWithTag($1) ', [String(tag)]);
            posts.rows = posts.rows.filter(post => tmp.rows.map(tmpPost => tmpPost.post_id).includes(post.post_id))
        }
        res.json({posts:posts.rows})
    } catch(e) {
        console.log(e);
    }
}

async function deleteOne(req: Request, res: Response) {
    try {
        const {post_id} = req.query;
        await db.queryPool(dbQuery.REMOVE_POST, [Number(post_id)]);
        res.json({});
    } catch(e) {
        console.log(e)
    }
}


export default {publish, get, deleteOne, toDraft};