const {Router} = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.json({
        saludo: "hola!"
    });
});

module.exports = router;