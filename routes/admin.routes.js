const {Router} = require('express');
const adminController = require('../controllers/admin.controller');
const router = Router();

router.get('/', adminController.loadHome);

router.get('/investigadores', adminController.loadResearches);

router.get('/unidades', adminController.loadUnits);

router.get('/centros', adminController.loadCenters);


module.exports = router;