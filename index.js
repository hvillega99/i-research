const express = require("express");
const path = require("path")
const morgan = require("morgan");
const passport = require("passport");

//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname,"public")));


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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
app.use('/admin', require('./routes/admin.routes'))
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


//start server
app.listen(app.get("port"), () => {
    console.log(`Server listen on localhost:${app.get("port")}`);
});
