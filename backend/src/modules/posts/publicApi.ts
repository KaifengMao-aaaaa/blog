import express from 'express';
import postModule from './wrapperFunctions';
const router = express.Router()

router.use('/uploads', express.static('uploads'));
router.get('/get', postModule.get);
router.get('/listCategories', postModule.listCategories)
export default router;