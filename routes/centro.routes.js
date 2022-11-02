const {Router} = require("express");
const centroControler = require('../controllers/centro.controller');
const centroRouter = Router();

centroRouter.get("/:ciName", centroControler.getPerfilCentro);

module.exports = centroRouter;