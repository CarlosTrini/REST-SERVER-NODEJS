const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios/';
    this.authPath = '/api/auth/';

    //conectar base de datos
    this.conectarDB();
    //middlewares
    this.middlewares();
    // parseo y lectura del body
    this.app.use(express.json());
    //rutas
    this.routes();
  }

  async conectarDB(){
    dbConnection();
  }

  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Disponible en http://localhost:${this.PORT}`);
    });
  }
}

module.exports = Server;
