const {CategoriasModel} = require('../models/');

const existeCategoria = async(id = '') => {
  const categoria = await CategoriasModel.findOne({_id:id, estado: true});
  if(!categoria) throw new Error(`No se encontró categoria relacionada a este ID: ${id}`);
}

const existeCategoriaNombre = async(nombre = '') => {
  nombre = nombre.toUpperCase();
  const categoria = await CategoriasModel.findOne({nombre, estado: true});
  if(!categoria) throw new Error(`No se encontró categoria relacionada a este nombre: ${nombre}`);
}


module.exports = {existeCategoria, existeCategoriaNombre};
