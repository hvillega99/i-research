const {Router} = require("express");
const router = Router();

router.get("/:scopusId", (req, res) => {
    res.render("../views/investigador.views.ejs")
});

module.exports = router;