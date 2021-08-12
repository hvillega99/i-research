const {Router} = require("express");
const resultadosControler = require('../controllers/resultados.controller');
const router = Router();

router.post("/", resultadosControler.find);

module.exports = router;