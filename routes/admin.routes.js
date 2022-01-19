const {Router} = require('express');
const adminController = require('../controllers/admin.controller');
const router = Router();

router.get('/', adminController.loadHome);

router.get('/investigadores', adminController.loadResearches);

router.get('/download/investigadores', adminController.downloadResearches);
router.get('/download/publicaciones', adminController.downloadDocuments);


router.get('/unidades', adminController.loadUnits);
router.post('/unidades', adminController.addUnit);
router.get('/unidades/edit/:idUnit', adminController.loadUnitEditForm);
router.post('/unidades/edit/:idUnit', adminController.editUnit);
router.get('/unidades/delete/:idUnit', adminController.deleteUnit);

router.get('/centros', adminController.loadCenters);
router.post('/centros', adminController.addCenter);
router.get('/centros/edit/:idCenter', adminController.loadCenterEditForm);
router.post('/centros/edit/:idCenter', adminController.editCenter);
router.get('/centros/delete/:idCenter', adminController.deleteCenter);


module.exports = router;