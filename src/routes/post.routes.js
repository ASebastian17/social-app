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

router.route('/posts/user/:userId')
    .get(isAuthenticated, postCtrl.getPostsByUser);
    
router.route('/posts/:postId/like')
    .put(isAuthenticated, postCtrl.likePost);
    
router.route('/posts/:postId/comment')
    .get(isAuthenticated, postCtrl.getPostComments)
    .post(isAuthenticated, postCtrl.addComment);

router.route('/posts/:postId/comment/:commentId')
    .get(isAuthenticated, postCtrl.getComment);

router.route('/posts/tag/:tag')
    .get(isAuthenticated, postCtrl.getPostsByTag);
    
export default router;
