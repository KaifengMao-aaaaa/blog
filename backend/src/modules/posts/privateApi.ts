import express from 'express';
import userModule from './wrapperFunctions';
const router = express.Router()
router.post('/publish', userModule.publish);
router.get('/get', userModule.get);
router.get('/getOne', userModule.getOne);
router.get('/getDrafts', userModule.getDrafts);
export default router;