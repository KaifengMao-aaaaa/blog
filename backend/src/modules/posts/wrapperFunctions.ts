import {Request, Response, query} from "express";
import db from '../database/db';
import dbQuery from '../database/queries';
async function publish(req: Request, res: Response) {
    try {
        const post = req.body.post;
        let postId = post.id;
        if (!post.id) {
            postId =  Number(String(Math.floor(Math.random() * 100000)) + String(Math.floor(Math.random() * 10000)));
            db.queryPool(dbQuery.INSERT_POST, [postId, post.title, post.banner, post.content, post.des, post.author, post.isDraft]);
        } else {
            db.queryPool(dbQuery.UPDATE_POST, [post.title, post.banner, post.content, post.des, post.author,post.isDraft, postId]);
        }
        for (const tag of post.tags) {
            db.queryPool(dbQuery.INSERT_TAG, [postId, tag]);
        }
        console.log(postId)
        console.log(post)
        res.json({postId});
    } catch (e) {
        console.log('error');
    }
}
async function get(req: Request, res: Response) {
    try {
        const {number, offset} = req.query;
        const posts = await db.queryPool(dbQuery.SELECT_POST.SELECT_NUMBER_POSTS, [Number(number), Number(offset)]);
        res.json({posts:posts.rows})
    } catch(e) {
        console.log(e);
    }
}
async function getOne(req: Request, res: Response) {
    try {
        const {postId} = req.query;
        const post = await db.queryPool(dbQuery.SELECT_POST.SELECT_ONE_POST, [Number(postId)]);
        if (post.rowCount === 0) {
            res.status(400).json({error: `The post doesn't exist`})
        } else {

            const tags = post.rows[0].tags?.split(',');
            res.json({post: {
                ...post.rows[0],
                isDraft: post.rows[0].is_draft,
                tags: tags ? tags : []
            }})
        }
    } catch(e) {
        console.log(e);
    }
}
async function getDrafts(req: Request, res: Response) {
    try {
        const {user} = req.body;
        const {number, offset} = req.query;
        const drafts = await db.queryPool(dbQuery.SELECT_POST.SELECT_NUMBER_DRAFTS, [Number(number), Number(offset)])
        res.json({drafts: drafts.rows})
       
    } catch(e) {
        console.log(e);
    }
}
export default {publish, get, getOne, getDrafts};