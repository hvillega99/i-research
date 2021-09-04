const {Router} = require("express");
const unidadControler = require('../controllers/unidad.controller');
const router = Router();

router.get("/:uaName", unidadControler.getPerfilUnidad);

module.exports = router;