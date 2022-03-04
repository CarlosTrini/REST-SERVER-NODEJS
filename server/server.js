const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios/';

    //middlewares
    this.middlewares();
    // parseo y lectura del body
    this.app.use(express.json());
    //rutas
    this.routes();
  }

  middlewares(){
    this.app.use(cors());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Disponible en http://localhost:${this.PORT}`);
    });
  }
}

module.exports = Server;
