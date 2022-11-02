const {Router} = require("express");
const resultadosControler = require('../controllers/resultados.controller');
const busquedaRouter = Router();

busquedaRouter.post("/", resultadosControler.find);

busquedaRouter.get("/", resultadosControler.renderFinder);


module.exports = busquedaRouter;