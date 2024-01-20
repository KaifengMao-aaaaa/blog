import express from 'express';
import userModule from './wrapperFunctions';
const router = express.Router()
router.post('/login', userModule.login);
router.post('/register', userModule.register);
export default router;