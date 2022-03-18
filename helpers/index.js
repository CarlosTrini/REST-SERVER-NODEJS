const  categoria = require('./existeCategoria');
const producto = require('./existeProducto');
const crearJwt = require('./generarJwt');
const verificarGoogle = require('./googleVerify');
const validacionesCampos = require('./validacionesDB');
const subirArchivo = require('./uploads');
const coleccionesPermitidas = require('./coleccionesPermitidas');


module.exports = {
  ...categoria,
  ...producto,
  ...crearJwt,
  ...verificarGoogle,
  ...validacionesCampos,
  ...subirArchivo,
  ...coleccionesPermitidas
}
