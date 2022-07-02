const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      blog: "/",
      auth: "/api/auth",
      users: "/api/users",
      buscar: "/api/buscar",
      productos: "/api/productos",
      categorias: "/api/categorias",
    };

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
    this.app.use(this.paths.blog, require("../blog.routes"));
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.users, require("../routes/users.routes"));
    this.app.use(this.paths.buscar, require("../routes/buscar.routes"));
    this.app.use(this.paths.productos, require("../routes/productos.routes"));
    this.app.use(this.paths.categorias, require("../routes/categorias.routes"));
  }

  listener() {
    this.app.listen(this.port || 8087, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
