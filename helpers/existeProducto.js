const {ProductoModel} = require('../models');

const existeProducto = async(id = '') => {
  const existeProducto = await ProductoModel.findOne({_id:id, estado: true});
  if(!existeProducto) throw new Error(`El producto con el ID: ${id} no fue encontrado en la base de datos`);
}


const existeProductoNombre = async(nombre = '') => {
  const existeProducto = await ProductoModel.findOne({nombre, estado: true});
  if(existeProducto) throw new Error(`Un producto ya está utilizando este nombre: ${nombre}`);
}


module.exports = { existeProducto, existeProductoNombre };