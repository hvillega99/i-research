const express = require("express");
const path = require("path")
const morgan = require("morgan");
const passport = require("passport");
const multer = require("multer");
const session = require("express-session");

//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname,"public")));


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
/*
app.use(session({secret: 'session_secret'}));
app.use(passport.initialize());
app.use(passport.session());
*/

const storage = multer.diskStorage({
    destination: path.join(__dirname,"public/logos"),
    filename: (req, file, func)=> {
        func(null, file.originalname);
    }
})

/*
function authenticateA(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/cas_login')
}
*/

app.use(multer({
    storage,
    dest: path.join(__dirname,"public/logos")
}).single('logo'));

//
passport.use(new (require('passport-cas').Strategy)({
    ssoBaseURL: 'http://auth.test.espol.edu.ec',
    serverBaseURL: 'http://localhost:3000'
  }, function(login, done) {
    console.log(login);
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
app.use('/resultados',require('./routes/resultados.routes'));
app.use('/investigador',require('./routes/investigador.routes'));
app.use('/unidad',require('./routes/unidad_academica.routes'));
app.use('/centro',require('./routes/centro_investigacion.routes'));
app.use('/api',require('./routes/api.routes'));
app.use('/cas_login',(req, res, next)=> {
    passport.authenticate('cas', function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          req.session.messages = info.message;
          return res.redirect('/');
        }
        req.logIn(user, function (err) {
          console.log('XDDDDDDDD');  
          if (err) {   
            return next(err);
          }
          //req.session.messages = '';
          return res.redirect('/admin/investigadores');
        });
      })(req, res, next);
})
app.use('/admin'/*,authenticateA */,require('./routes/admin.routes'));
/*
app.use('/cas_logout',(req, res)=> {
  req.logout(); // provided by passport
  res.redirect('/cas_login');
});
*/

//start server
app.listen(app.get("port"), () => {
    console.log(`Server listen on localhost:${app.get("port")}`);
});
