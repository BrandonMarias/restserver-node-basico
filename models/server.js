const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.usersPath = "/api/users";
    this.authPath = "/api/auth";
    this.blogPath = "/";

    // conexión a la base de datos
    this.databaseConection();
    //middelwares
    this.middlewares();
    //rustas
    this.routes();
  }

  async databaseConection() {
    dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    //lectura y parceo del body

    this.app.use(express.json());

    //directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth.routes"));
    this.app.use(this.usersPath, require("../routes/users.routes"));
    this.app.use(this.blogPath, require("../blog.routes"));
  }

  listener() {
    this.app.listen(this.port || 8087, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
