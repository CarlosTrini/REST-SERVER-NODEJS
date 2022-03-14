const auth = require('./auth');
const usuarios = require('./usuarios');
const categorias = require('./categorias');
const productos = require('./productos');

module.exports = {
  ...auth,
  ...usuarios,
  ...categorias,
  ...productos
}