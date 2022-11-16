const express = require("express");
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const path = require("path")
const session = require("express-session");

const Cache = require('./cache/cache');
const indexRouter = require('./routes/index.routes');
const passport = require('./auth/cas');

const app = express()
new Cache();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname,"public")));

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret: 'session_secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.use('/', indexRouter);

global.adminUser = '';

module.exports = app;