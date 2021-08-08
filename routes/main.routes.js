const {Router} = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("../views/main.views.ejs",{saludo:"mundo"})
    
});

module.exports = router;