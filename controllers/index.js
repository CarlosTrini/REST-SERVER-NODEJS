const auth = require('./auth');
const usuarios = require('./usuarios');
const categorias = require('./categorias');
const productos = require('./productos');
const buscar = require('./buscar');
const uploads = require('./uploads');

module.exports = {
  ...auth,
  ...usuarios,
  ...categorias,
  ...productos,
  ...buscar,
  ...uploads
}