const {Router} = require('express');
const authController = require('../controllers/auth.controller');
const authRouter = Router();

authRouter.get('/cas_login', authController.login);
authRouter.get('/cas_logout', authController.logout);

module.exports = authRouter;