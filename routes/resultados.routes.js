const {Router} = require("express");
const router = Router();

router.post("/", (req, res) => {
    res.render("../views/resultados.views.ejs", {resultados: req.body.terms})
});

module.exports = router;