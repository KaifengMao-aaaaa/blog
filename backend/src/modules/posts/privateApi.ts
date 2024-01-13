import express from 'express';
import userModule from './wrapperFunctions';
const router = express.Router()
router.post('/publish', userModule.publish);
router.put('/toDraft', userModule.toDraft);
router.get('/get', userModule.get);
router.delete('/deleteOne', userModule.deleteOne);
export default router;