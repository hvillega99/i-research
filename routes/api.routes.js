const {Router} = require("express");
const apiController = require('../controllers/api.controller');
const Scival = require('../helpers/scival');
const scival = new Scival();
const router = Router();

router.get("/citationsByYear/:scopusId", async (req, res) => {
    const citations = await scival.getCitations(req.params.scopusId);
    res.send(citations);
});

router.get("/publicationsByYear/:scopusId", async (req, res) => {
    const publications = await scival.getPublications(req.params.scopusId);
    res.send(publications); 
});


router.get('/unit/bibliometrics/:ua', apiController.getBibliometricsUnit);

router.get('/unit/projects/:ua', apiController.getProjectsByUnit);

router.get('/collaborators/:scopusId/:publications', apiController.getCollaborators);

router.get('/projects/:author', apiController.getProjectsByAuthor);

router.get('/publicationsInfo/:id', apiController.getPublicationsInfo);


router.get("/sdg/publications/:sdg", apiController.getPublicationsBySDG);

router.get("/sdg/documentCount", apiController.getDocumentCountBySDG);

router.get('/espol/collaboration/documentCount',apiController.getNDocsByCountry);

router.get('/espol/collaboration/documents/:country',apiController.getInfoDocsByCountry);

router.get('/espol/metrics/authorsByGender',apiController.getAuthorCountByGender);

router.get('/citationsByYearEspol', apiController.getEspolCitationsByYear);

router.get('/publicationsByYearEspol', apiController.getEspolPublicationsByYear);

router.get('/publications/topJournalPercentiles/inst', apiController.getTopJournalInst);

router.get('/topAuthors', apiController.getTopAuthors);

router.get('/publications/areas/inst', apiController.getPublicationsByArea);

router.get('/collaborators/:keywords', apiController.getAuthors_keywords);

module.exports = router;