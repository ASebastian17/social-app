import express from 'express';

import * as authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/login')
    .post(authCtrl.login);

export default router;
