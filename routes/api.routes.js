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

router.get('/citationsByYear/ua/:ua', apiController.getUACitationsByYear);

router.get('/publicationsByYear/ua/:ua', apiController.getUAPublicationsByYear);

router.get('/citationsByYearEspol', apiController.getEspolCitationsByYear);

router.get('/publicationsByYearEspol', apiController.getEspolPublicationsByYear);

router.get('/topAuthors', apiController.getTopAuthors);

module.exports = router;