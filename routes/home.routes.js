const {Router} = require("express");
const mainControler = require('../controllers/main.controller');
const homeRouter = Router();

homeRouter.get("/", mainControler.getMainPage);

module.exports = homeRouter;