const {Router} = require('express');
const adminController = require('../controllers/admin.controller');
const adminRouter = Router();

adminRouter.get('/', adminController.loadResearchers);
adminRouter.post('/upload/investigadores', adminController.uploadResearchers);
adminRouter.post('/upload/publicaciones', adminController.uploadDocuments);
adminRouter.post('/upload/usuarios', adminController.uploadUsers);
adminRouter.post('/upload/apikey', adminController.uploadApiKey);


adminRouter.get('/download/investigadores', adminController.downloadResearchers);
adminRouter.get('/download/publicaciones', adminController.downloadDocuments);
adminRouter.get('/download/usuarios', adminController.downloadUsers);
adminRouter.get('/download/apikey', adminController.downloadApiKey);


adminRouter.get('/unidades', adminController.loadUnits);
adminRouter.post('/unidades', adminController.addUnit);
adminRouter.get('/unidades/edit/:idUnit', adminController.loadUnitEditForm);
adminRouter.post('/unidades/edit/:idUnit', adminController.editUnit);
adminRouter.get('/unidades/delete/:idUnit', adminController.deleteUnit);

adminRouter.get('/centros', adminController.loadCenters);
adminRouter.post('/centros', adminController.addCenter);
adminRouter.get('/centros/edit/:idCenter', adminController.loadCenterEditForm);
adminRouter.post('/centros/edit/:idCenter', adminController.editCenter);
adminRouter.get('/centros/delete/:idCenter', adminController.deleteCenter);


module.exports = adminRouter;