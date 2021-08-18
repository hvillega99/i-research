const {Router} = require("express");
const investigadorControler = require('../controllers/investigador.controller');
const router = Router();

router.get("/:scopusId", investigadorControler.getPerfilInvestigador);

module.exports = router;