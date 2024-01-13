import express, {Express, Request, Response} from "express";
import {jwk_secret} from '../backend_config'
import jwt from 'jsonwebtoken';
const router = express.Router()
router.use('/',(req: Request, res: Response, next) => {
    let token: string = req.cookies['token'];
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtmIiwidXNlcklkIjoxNDY5NTczODMsImlhdCI6MTcwNDcxMzg0Nn0.QwoI9paV1ATvcaO3MihvYHlhhKn9Yu7y6d-fSRkrJMs'
    if (!token) {
        return res.status(401).json({error: 'No access token'})
    }
    jwt.verify(token, jwk_secret, (err, userInfo) => {
        if (err) {
            return res.status(403).json({error: 'Access token is invalid'})
        }
        req.body.user = userInfo;
        next();
    } )
    
}) 
export default router;