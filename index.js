const express = require("express");
const path = require("path")
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const fileUpload = require('express-fileupload');

const Cache = require('./cache/cache.js');
new Cache();

const Resourcesdb = require('./helpers/resourcesdb');
const resources = new Resourcesdb();

const casConfig = require('./casConfig.json');

//initializations
const app = express()

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname,"public")));


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({secret: 'session_secret'}));
app.use(passport.initialize());
app.use(passport.session());


app.use(fileUpload());

function borradoCache(req,res,next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  return next();
}

function authenticateA(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/cas_login')
}


//
passport.use(new (require('passport-cas').Strategy)({
    ssoBaseURL: casConfig.casURL,
    serverBaseURL: casConfig.baseURL
  }, function(login, done) {
    return done(null, login);
  }));

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

//routes
app.use('/',require('./routes/main.routes'))
app.use('/busqueda',require('./routes/busqueda.routes'));
app.use('/investigador',require('./routes/investigador.routes'));
app.use('/unidad',require('./routes/unidad_academica.routes'));
app.use('/centro',require('./routes/centro_investigacion.routes'));
app.use('/api',require('./routes/api.routes'));

app.use('/colaboracion', (req, res)=>{
    res.render('map.ejs')  
})

app.use('/noAutorizado',(req,res)=>{
  return res.render('../views/permiso.views.ejs')
})

app.use('/cas_login',(req, res, next)=> {
    passport.authenticate('cas', function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          req.session.messages = info.message;
          return res.redirect('/');
        }
       const listaAd = resources.getUsers();
      
       
       if(!(listaAd.includes(user))){
         return res.redirect('/noAutorizado')
       }

        req.logIn(user, function (err) {
          if (err) {   
            return next(err);
          }
          //req.session.messages = '';
          app.locals.user = user;
          return res.redirect('/admin');
        });
      })(req, res, next);
})
app.use('/admin',borradoCache ,authenticateA ,require('./routes/admin.routes'));

app.use('/cas_logout',(req, res)=> {
  req.logout(); // provided by passport
  res.redirect(casConfig.casLogout);
  
});

app.use('*',(req, res)=> {
  res.render('notFound.views.ejs');
})


//start server
app.listen(app.get("port"), () => {
    console.log(`Server listen on localhost:${app.get("port")}`);
});
