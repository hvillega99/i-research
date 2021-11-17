const {Router} = require("express");
const mainControler = require('../controllers/main.controller');
const router = Router();

router.get("/", mainControler.getMainPage);

module.exports = router;