import express, {Express, Request, Response} from "express";
import privateUserModule from './modules/users/privateApi';
import privatePostModule from './modules/posts/privateApi';
import publicUserModule from './modules/users/publicApi';
import publicPostModule from './modules/posts/publicApi'
import authorization from './authorization';
import cookieParser from 'cookie-parser';
import {PORT} from '../backend_config';
import cors from 'cors';
import graphql from './graphql_index';
const app: Express = express()
// parse json body of request 
app.use(express.json());
// parse cookie of request
app.use(cookieParser());
// Make hosts from other network could access these API
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.get('/', (req, res) => {
    res.json('hii')
})
app.use('/api/graphql', graphql);
// public routers
app.use('/api/user', publicUserModule);
app.use('/api/post', publicPostModule);
//authorization middlewares
app.use('/api', authorization);
// private routers
app.use('/api/user', privateUserModule);
app.use('/api/post', privatePostModule);
app.get('/api', async (req:Request,res:Response) => {
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});