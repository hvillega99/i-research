const {Router} = require("express");
const centroControler = require('../controllers/centro.controller');
const router = Router();

router.get("/:ciName", centroControler.getPerfilCentro);

module.exports = router;