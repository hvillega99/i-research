const {Router} = require('express');
const adminController = require('../controllers/admin.controller');
const router = Router();

router.get('/', adminController.loadHome);

router.get('/investigadores', adminController.loadResearches);

router.get('/unidades', adminController.loadUnits);
router.post('/unidades', adminController.addUnit);

router.get('/unidades/delete/:idUnit', adminController.deleteUnit);
router.get('/unidades/edit/:idUnit', adminController.loadEditUnitForm);
router.post('/unidades/edit/:idUnit', adminController.editUnit);

router.get('/centros', adminController.loadCenters);


module.exports = router;