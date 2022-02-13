import express from 'express';

import * as postCtrl from '../controllers/post.controller.js';
import { isAuthenticated } from '../helpers/auth.js';

const router = express.Router();

router.route('/posts')
    .get(isAuthenticated, postCtrl.getAllPosts)
    .post(isAuthenticated, postCtrl.create);
    
    router.route('/posts/:postId')
    .get(isAuthenticated, postCtrl.getPostById)
    .put(isAuthenticated, postCtrl.update)
    .delete(isAuthenticated, postCtrl.remove);
    
router.route('/posts/:postId/comment')
    .post(isAuthenticated, postCtrl.addComment);
    
    
export default router;
