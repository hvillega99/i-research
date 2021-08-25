require("dotenv").config()

const express = require("express");
const path = require("path")
const morgan = require("morgan");

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

//routes
app.use('/',require('./routes/main.routes'))
app.use('/resultados',require('./routes/resultados.routes'))
app.use('/investigador',require('./routes/investigador.routes'))
app.use('/unidad',require('./routes/unidad_academica.routes'))
app.use('/centro',require('./routes/centro_investigacion.routes'))

//start server
app.listen(app.get("port"), () => {
    console.log(`Server listen on localhost:${app.get("port")}`);
});