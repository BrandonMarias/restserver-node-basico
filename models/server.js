const express = require("express");
const cors = require('cors')

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = '/api/users'

    //middelwares
    this.middlewares();
    //rustas
    this.routes();
  }

  middlewares() {

    this.app.use(cors())

    //lectura y parceo del body

    this.app.use(express.json())

    //directorio público
    this.app.use(express.static("public"));
  }

  routes() {

    this.app.use(this.usersPath, require('../routes/users.routes'))


  }

  listener() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
