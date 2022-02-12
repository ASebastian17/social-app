import express from 'express';

import * as postCtrl from '../controllers/post.controller.js';
import { isAuthenticated } from '../helpers/auth.js';

const router = express.Router();

router.route('/posts/:postId')
    .get(isAuthenticated, postCtrl.getPostById)
    .put(isAuthenticated, postCtrl.update)
    .delete(isAuthenticated, postCtrl.remove);

export default router;
