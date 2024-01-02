import express, {Express, Request, Response} from "express";
import privateUserModule from './modules/users/privateApi';
import privatePostModule from './modules/posts/privateApi';
import publicUserModule from './modules/users/publicApi';
import authorization from './authorization';
import cookieParser from 'cookie-parser';
import {PORT} from '../backend_config';
import cors from 'cors';
const app: Express = express()
// parse json body of request 
app.use(express.json());
// parse cookie of request
app.use(cookieParser());
// Make hosts from other network could access these API
app.use(cors({credentials: true, origin:'http://localhost:3000'}));

// public routers
app.use('/user', publicUserModule);

//authorization middlewares
app.use('/', authorization);
// private routers
app.use('/user', privateUserModule);
app.use('/post', privatePostModule);
app.get('/', async (req:Request,res:Response) => {
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});