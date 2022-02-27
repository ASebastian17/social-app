import express from 'express';

import * as userCtrl from '../controllers/user.controller.js';
import { isAuthenticated } from '../helpers/auth.js';

const router = express.Router();

router.route('/users')
    .get(isAuthenticated, userCtrl.getAllUsers)
    .post(userCtrl.create);

router.route('/users/:userId')
    .get(isAuthenticated, userCtrl.getUserById)
    .put(isAuthenticated, userCtrl.update)
    .delete(isAuthenticated, userCtrl.remove);

router.route('/users/:userId/follow')
    .put(isAuthenticated, userCtrl.followUser);

export default router;
