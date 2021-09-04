const {Router} = require("express");
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

module.exports = router;