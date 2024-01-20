import express from 'express';
import userModule from './wrapperFunctions';
const router = express.Router()
router.post('/logout', userModule.logout);
// router.get('/getName', userModule.getName)
router.get('/profile', userModule.profile);
export default router;