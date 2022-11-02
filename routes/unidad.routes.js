const {Router} = require("express");
const unidadControler = require('../controllers/unidad.controller');
const unidadRouter = Router();

unidadRouter.get("/:uaName", unidadControler.getPerfilUnidad);

module.exports = unidadRouter;