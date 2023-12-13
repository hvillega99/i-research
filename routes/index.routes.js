const {Router} = require('express');

const adminRouter = require('./admin.routes');
const apiRouter = require('./api.routes');
const authRouter = require('./auth.routes');
const busquedaRouter = require('./busqueda.routes');
const centroRouter = require('./centro.routes');
const colaboracionRouter = require('./colaboracion.routes');
const homeRouter = require('./home.routes');
const investigadorRouter = require('./investigador.routes');
const permisoRouter = require('./permiso.routes');
const unidadRouter = require('./unidad.routes');
const odsRouter = require('./ods.routes');

const indexRouter = Router();

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  }

  res.redirect('auth/cas_login')
}

function clearCache(req,res,next) {
  res.header(
    'Cache-Control', 
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  );

  return next();
}

indexRouter.use('/', homeRouter);
indexRouter.use('/admin', isAuthenticated, clearCache, adminRouter);
indexRouter.use('/api', apiRouter);
indexRouter.use('/auth', authRouter);
indexRouter.use('/busqueda', busquedaRouter);
indexRouter.use('/centro', centroRouter);
indexRouter.use('/colaboracion', colaboracionRouter);
indexRouter.use('/investigador', investigadorRouter);
indexRouter.use('/sin-permiso', permisoRouter);
indexRouter.use('/unidad', unidadRouter);
indexRouter.use('/ods', odsRouter);

indexRouter.use('*',(req, res)=> {
  res.render('notFound.views.ejs');
})

module.exports = indexRouter;
