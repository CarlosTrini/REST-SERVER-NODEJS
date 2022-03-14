const  categoria = require('./existeCategoria');
const producto = require('./existeProducto');
const crearJwt = require('./generarJwt');
const verificarGoogle = require('./googleVerify');
const validacionesCampos = require('./validacionesDB');


module.exports = {
  ...categoria,
  ...producto,
  ...crearJwt,
  ...verificarGoogle,
  ...validacionesCampos
}
