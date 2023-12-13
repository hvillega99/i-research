const {Router} = require("express");
const odsController = require('../controllers/ods.controller');

const odsRouter = Router();

odsRouter.get('/:tag', odsController.showOdsInfo);

module.exports = odsRouter;