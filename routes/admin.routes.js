const {Router} = require('express');
const adminController = require('../controllers/admin.controller');
const router = Router();

router.get('/', adminController.loadResearchers);
router.post('/upload/investigadores', adminController.uploadResearchers);
router.post('/upload/publicaciones', adminController.uploadDocuments);
router.post('/upload/usuarios', adminController.uploadUsers);


router.get('/download/investigadores', adminController.downloadResearchers);
router.get('/download/publicaciones', adminController.downloadDocuments);
router.get('/download/usuarios', adminController.downloadUsers);


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