import {Request, Response} from "express";
import db from "../database/db";
import SQL_query from '../database/queries'
// import { v4 as uuidv4 } from 'uuid';
import {jwk_secret} from '../../../backend_config'
import jwt from 'jsonwebtoken';
async function register(req: Request, res: Response) {
    try {
        const {password, username} = req.body;
        const response = await db.queryPool(SQL_query.SELECT_USER.BY_USERNAME, [username])
        if (response.rows.length != 0) {
            res.status(400).send('The username have existed')
        }
        const userId =  Number(String(Math.floor(Math.random() * 100000)) + String(Math.floor(Math.random() * 10000)));
        await db.queryPool(SQL_query.INSERT_USER, [userId, username, password]);
        res.json({userId});
    } catch(e) {
        console.log(e);
    }
}

async function login(req: Request, res: Response) {
    try {
        const {password, username} = req.body;
        const response = await db.queryPool(SQL_query.SELECT_USER.BY_USERNAME, [username])
        if (response.rows.length === 0) {
            res.status(400).send('The username don\'t existed');
        } else if (response.rows[0].password !== password) {
            res.status(400).send('Password is incorrect');
        } else {
            jwt.sign({username, userId: response.rows[0].id}, jwk_secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {httpOnly: true}).json({
                    username, userId: response.rows[0].id
                });
            })
            // const token = uuidv4();
            // await db.queryPool(SQL_query.INSERT_TOKEN, [response.rows[0].id, token])
            // res.cookie('token', token).json({token})
        }
    } catch(e) {
        console.log(e);
    }
}
async function logout(req:Request, res: Response) {
    try {
        // const {token, username} = req.body;
        // await db.queryPool(SQL_query.REMOVE_TOKEN, [username, token]);
        res.cookie('token', '').send('ok');
        // res.status(200).send('OK');
    } catch(e) {
        console.log(e);
    }
}
async function profile(req:Request, res: Response) {
    const {token} = req.cookies;
    try {
        jwt.verify(token, jwk_secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        })
    } catch(e) {
        
    }
}

async function getName(req:Request, res: Response) {
    try {
        const {userId} = req.query;
        const response = await db.queryPool('SELECT name FROM USERS WHERE id = $1', [Number(userId)]);
        if (response.rowCount === 0) {
            res.json({error: 'Cannot find that user with the Id'}).status(400);
        }
        res.json({username: response.rows[0].name})
    } catch(e) {
        console.log('erro')
        // console.log(e);
    }
}
async function getUser(id:String) {
    try {
        return {code: 400}
        // const response = await db.queryPool('SELECT name FROM USERS WHERE id = $1', [Number(userId)]);
        // if (response.rowCount === 0) {
        //     return {code: 400}
        // }
    } catch(e) {
        console.log(e);
    }
}
export default {register, login, logout, profile, getName};