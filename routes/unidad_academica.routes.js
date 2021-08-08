const {Router} = require("express");
const router = Router();

router.get("/:uaName", (req, res) => {
    res.render("../views/unidad_academica.views.ejs")
});

module.exports = router;