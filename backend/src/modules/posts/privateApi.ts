import express, {Express, Request, Response} from "express";
import postModule from './wrapperFunctions';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const post_id = req.query.post_id as string;
        cb(null, file.fieldname + '-' + post_id + '.png')
    }
});

const upload = multer({ storage: storage });
const router = express.Router()
router.post('/publish', postModule.publish);
router.put('/toDraft', postModule.toDraft);
router.delete('/deleteOne', postModule.deleteOne);
router.post('/createCategory', postModule.createCategory)
router.post('/upload', upload.single('banner'), postModule.upload);
export default router;