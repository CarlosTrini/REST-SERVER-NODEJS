const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;

    this.paths = {
      auth: "/api/auth/",
      buscar: "/api/buscar/",
      usuarios: "/api/usuarios/",
      categorias: "/api/categorias/",
      productos: "/api/productos/",
      uploads: "/api/uploads/",
    };

    //conectar base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();
    // parseo y lectura del body
    this.app.use(express.json());
    //rutas
    this.routes();
  }

  async conectarDB() {
    dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    //carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Disponible en http://localhost:${this.PORT}`);
    });
  }
}

module.exports = Server;
