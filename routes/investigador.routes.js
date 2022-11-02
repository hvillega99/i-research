const {Router} = require("express");
const investigadorControler = require('../controllers/investigador.controller');
const investigadorRouter = Router();

investigadorRouter.get("/:scopusId", investigadorControler.getPerfilInvestigador);

module.exports = investigadorRouter;