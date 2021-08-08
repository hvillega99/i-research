const {Router} = require("express");
const router = Router();

router.get("/:ciName", (req, res) => {
    res.render("../views/centro_investigacion.views.ejs")
});

module.exports = router;