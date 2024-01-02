import express from 'express';
import userModule from './wrapperFunctions';
const router = express.Router()
router.post('/login', userModule.login);
router.post('/register', userModule.register);
router.get('/profile', userModule.profile);
export default router;