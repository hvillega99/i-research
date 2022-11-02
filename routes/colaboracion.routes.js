const {Router} = require('express');

const colaboracionRouter = new Router();

colaboracionRouter.get('/', (req, res)=>{
    res.render('colaboracion.views.ejs')  
})

module.exports = colaboracionRouter;