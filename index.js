const app = require('./app');

//start server
app.listen(

  app.get('port'), 

  () => {
    console.log(`Servidor escuchando en localhost:${app.get("port")}`);
  }

);
