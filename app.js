require('dotenv').config();

const Server = require('./server/server');

//iniciando el servidor
const server = new Server();
server.listen();



