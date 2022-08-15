const {Router} = require("express");
const resultadosControler = require('../controllers/resultados.controller');
const router = Router();

router.post("/", resultadosControler.find);

router.get("/", resultadosControler.renderFinder);


module.exports = router;