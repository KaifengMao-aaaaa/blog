import {Request, Response} from "express";
import db from "../database/db";
import SQL_query from '../database/queries'
// import { v4 as uuidv4 } from 'uuid';
import {jwk_secret, registration_enable} from '../../../backend_config'
import jwt from 'jsonwebtoken';
import authLogger from '../logger/authentication';
async function register(req: Request, res: Response) {
    try {
        const {password, username} = req.body;
        const response = await db.queryPool(SQL_query.SELECT_USER.BY_USERNAME, [username])
        if (response.rows.length != 0) {
            res.status(403).send({err:'Registration request cannot be completed'})
            return;
        }
        const userId =  Number(String(Math.floor(Math.random() * 100000)) + String(Math.floor(Math.random() * 10000)));
        if (registration_enable) {
            await db.queryPool(SQL_query.INSERT_USER, [userId, username, password]);
            res.json({userId});
        } else {
            res.send('Registration has blocked').status(403);
        }
    } catch(e) {
        res.json('Unknown error').status(403);
    }
}

async function login(req: Request, res: Response) {
    try {
        const {password, username} = req.body;
        const response = await db.queryPool(SQL_query.SELECT_USER.BY_USERNAME, [username])
        if (response.rows.length === 0) {
            res.status(403).send({err: 'Invalid username or password'});
            return;
        } else if (!(password === response.rows[0].password)) {
            res.status(403).send('Invalid username or password');
            return;
        } else {
            jwt.sign({username, userId: response.rows[0].id}, jwk_secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, {httpOnly: true}).json({
                    username, userId: response.rows[0].id
                });
            })
            authLogger.info({username, userId: response.rows[0].id, action: 'login'});
            // const token = uuidv4();
            // await db.queryPool(SQL_query.INSERT_TOKEN, [response.rows[0].id, token])
            // res.cookie('token', token).json({token})
        }
    } catch(e) {
        res.json('Unknown error').status(500);
    }
}
async function logout(req:Request, res: Response) {
    try {
        const {user} = req.body;
        res.cookie('token', '').send('ok');
        authLogger.info({username: user.username, userId: user.userId, action: 'logout'});
    } catch(e) {
        res.json('Unknown error').status(500);
    }
}
async function profile(req:Request, res: Response) {
    const {token} = req.cookies;
    const {user} = req.body;
    try {
        jwt.verify(token, jwk_secret, {}, (err, info) => {
            if (err) {res.json('Invalid taken')};
            res.json(info);
        })
    } catch(e) {
        res.json('Unknown error').status(500);
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
        res.json('unknow error')
    }
}
export default {register, login, logout, profile, getName};