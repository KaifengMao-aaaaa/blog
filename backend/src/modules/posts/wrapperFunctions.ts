import {Request, Response, query} from "express";
import db from '../database/db';
import dbQuery from '../database/queries';
async function publish(req: Request, res: Response) {
    try {
        let post = req.body.post;
        let postId = post.post_id;
        db.query('BEGIN');
        if (post.category) {
            const response = await db.queryPool('SELECT name FROM categories', []);
            if (response.rows.filter(r => r.name === post.category).length === 0) {
                await db.queryPool('INSERT INTO categories VALUES($1)', [post.category]);
            }
        } else {
            post.category = null;
        } 
        if (!postId) {
            postId =  Number(String(Math.floor(Math.random() * 100000)) + String(Math.floor(Math.random() * 10000)));
            db.queryPool(dbQuery.INSERT_POST, [postId, post.title, post.banner, post.content, post.des, post.author, post.is_draft, post.category]);
        } else {
            db.queryPool(dbQuery.UPDATE_POST, [post.title, post.banner, post.content, post.des, post.author,post.is_draft,post.category, postId]);
        }
        await db.queryPool("DELETE FROM have_tag where post_id = $1", [postId]);
        for (const tag of post.tags) {
            db.queryPool(dbQuery.INSERT_TAG, [postId, tag]);
        }
        res.json({postId});
    } catch (e) {
        res.json('Error happened').status(500);
        db.query('ROLLBACK');
    }
}
async function toDraft(req: Request, res: Response) {
    try {
        const {user} = req.body;
        const post_id = req.body.post_id;
        const response = await db.queryPool('SELECT author FROM posts WHERE id = $1', [post_id]);
        if (response.rows[0].author !== user.userId) {
            res.send('Cannot convert post to draft').status(401);
            return;
        }
        db.queryPool('UPDATE posts SET is_draft = true WHERE id = $1', [post_id]);
        res.json({});
    } catch (e) {
        res.json('Error happened').status(403);
    }
}
async function get(req: Request, res: Response) {
    try {
        let {number, offset, tag, post_id, pattern, order_by, is_draft, author, category} = req.query;
        if (offset === undefined || offset === '' || offset === 'undefined') {
            offset = '0';
        }
        if (number === undefined || number === '' || number === 'undefined') {
            number = '999';
        }
        const validColumns = ['undefined', 'post_id', 'title', 'content', 'des', 'author_name', 'publish_time'];
        if (!(validColumns.filter(column => String(order_by).startsWith(column)).length === 1)) {
            return res.json({err: 'Invalid column name'}).status(401);
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
        if (category !== undefined && category !== '' && category !== 'undefined') {
            const tmp = await db.queryPool('SELECT id as post_id FROM posts where category = $1 ', [String(category)]);
            posts.rows = posts.rows.filter(post => tmp.rows.map(tmpPost => tmpPost.post_id).includes(post.post_id))
        }
        res.json({posts:posts.rows})
    } catch(e) {
        res.json('Error happened').status(403);
    }
}

async function deleteOne(req: Request, res: Response) {
    const {user} = req.body;
    try {
        const {post_id} = req.query;
        const response = await db.queryPool('SELECT author FROM posts WHERE id = $1', [Number(post_id)]);
        if (response.rows[0].author !== user.userId) {
            res.json('Deletion cannot completed').status(401);
            return;
        }
        await db.queryPool(dbQuery.REMOVE_POST, [Number(post_id)]);
        res.json({});
    } catch(e) {
        res.json('Error happened').status(403);
    }
}
async function createCategory(req: Request, res: Response) {
    const {user} = req.body;
    try {
        const {category} = req.body;
        await db.queryPool('INSERT INTO categories(name) VALUES($1) ', [category]);
        res.json({});
    } catch(e) {
        res.json(`Error happened`).status(403);
    }
}
async function listCategories(req: Request, res: Response) {
    try {
        const response = await db.queryPool('SELECT name FROM categories', []);
        res.json({categories: response.rows});
    } catch(e) {
        res.json('Error happened').status(403);
    }
}
async function upload(req:Request, res:Response) {
    res.send('correct to upload')
}
export default {publish, get, deleteOne, toDraft, createCategory, listCategories, upload};