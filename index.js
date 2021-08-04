require("dotenv").config()

const express = require("express");
const morgan = require("morgan");

//initializations
const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.set('view engine', 'ejs');

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use("/",require("./routes/main"))

//start server
app.listen(app.get("port"), () => {
    console.log(`Server listen on localhost:${app.get("port")}`);
});