const {Router} = require("express");
const apiController = require('../controllers/api.controller');

const apiRouter = Router();

//investigadores

apiRouter.get('/investigadores/citationCount/:scopusId', apiController.getCitationCount);
apiRouter.get('/investigadores/colaboradores/:scopusId/:documentIds', apiController.getCollaborators);
apiRouter.get('/investigadores/documentCount/:scopusId', apiController.getDocumentCount);
apiRouter.get('/investigadores/proyectos/:scopusId', apiController.getProjectsByAuthor);
apiRouter.get('/investigadores/top', apiController.getTopAuthors);

//unidades

apiRouter.get('/unidades/metricas/:ua', apiController.getBibliometricsUnit);
apiRouter.get('/unidades/proyectos/:ua', apiController.getProjectsByUnit);

//espol

apiRouter.get('/espol/colaboracion/documentCount', apiController.getNDocsByCountry);
apiRouter.get('/espol/colaboracion/documents/:country', apiController.getInfoDocsByCountry);
apiRouter.get('/espol/metricas/autoresPorSexo', apiController.getAuthorCountByGender);
apiRouter.get('/espol/metricas/citationCount', apiController.getEspolCitationsByYear);
apiRouter.get('/espol/metricas/documentCount', apiController.getEspolPublicationsByYear);
apiRouter.get('/espol/metricas/documentCountAreas', apiController.getPublicationsByArea);
apiRouter.get('/espol/metricas/topJournalPercentiles', apiController.getTopJournalInst);
apiRouter.get('/espol/ods/documents/:sdg', apiController.getPublicationsBySDG);
apiRouter.get('/espol/ods/metricas', apiController.getBibliometricsBySDG);
apiRouter.get('/espol/ods/proyectos/:ods', apiController.getProjectsByODS);

//publicaciones

apiRouter.get('/publicaciones/:id', apiController.getPublicationsInfo);

module.exports = apiRouter;