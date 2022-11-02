const {Router} = require('express');

const permisoRouter = new Router();

permisoRouter.get('/', (req, res)=>{
    res.render('sinPermiso.views.ejs')  
})

module.exports = permisoRouter;