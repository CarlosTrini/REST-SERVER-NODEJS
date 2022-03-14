const { response } = require("express");
const { isValidObjectId } = require("mongoose");

const {
  ProductoModel,
  CategoriasModel,
  UsuarioModel,
  RolesModel,
} = require("../models/index");

const coleccionesValidas = {
  productos: "productos",
  categorias: "categorias",
  usuarios: "usuarios",
  roles: "roles",
};

// CONTROLADOR PRINCIPAL
const buscar = async (req, res = response) => {
  const { coleccion, termino } = req.params;

  // verificar que la colección sea válida
  const existeCategoria = Object.values(coleccionesValidas).includes(coleccion);
  if (!existeCategoria)
    return res.status(400).json(`Esta colección: ${coleccion.toUpperCase()}, no se encuentra dentro de las colecciones permitidas: ${Object.values(coleccionesValidas)}`);

    // operaciones en base a la colección seleccionada
  switch (coleccion) {
    case coleccionesValidas.productos:
      return buscarProducto(termino, res);

    case coleccionesValidas.usuarios: 
      return buscarUsuario(termino, res);
    case coleccionesValidas.categorias: 
      return buscarCategoria(termino, res);
    default:
      return res.status(500).json("Esta colección no es válida. Comuniquese con el administrador");
  }
};

// -------- FUNCIONES PARA COMPLEMENTAR EL CONTROLADOR
//verifica si el termino recibido es un mongoId...
const terminoEsId = (termino ='') =>  isValidObjectId(termino);

// busca producto por nombre o por id...
const buscarProducto = async (termino = "", res = response) => {
  const esId = terminoEsId(termino);

  if (esId) {
    const producto = await ProductoModel.findById(termino);
    return res.status(200).json({ resultados: producto ? [producto] : [] });
  }

  const regex = new RegExp(termino, "i");
  const [cantidad, productos] = await Promise.all([
    await ProductoModel.find({nombre: regex, estado: true}).countDocuments(),
    await ProductoModel
      .find({nombre: regex, estado: true})
      .populate({path: 'categoria', select: 'nombre'})
      .populate({path: 'usuario', select: 'nombre'}),
  ]);
  return res.status(200).json({ cantidad, resultados: productos });
};

const buscarUsuario = async(termino = '', res = response) => {

  const esId = terminoEsId(termino);

  if(esId){
    const usuario = await UsuarioModel.findById(termino);
    return res.status(200).json({resultados: (usuario) ? [usuario] : [] });
  }
  
  const regex = new RegExp(termino, 'i');

  const [cantidad, usuarios] = await Promise.all([
    await UsuarioModel.find({
      $or: [{nombre: regex}, {correo: regex}],
      $and: [{estado: true}]
    }).countDocuments(),
    await UsuarioModel.find({
      $or: [{nombre: regex}, {correo: regex}],
      $and: [{estado: true}]
    })
  ]);
  return res.status(200).json({cantidad, resultados: usuarios});

}

const buscarCategoria = async(termino ='', res = response) => {
  const esId = terminoEsId(termino);

  if(esId){
    const categoria = await CategoriasModel.findById(termino);
    return res.status(200).json({resultados: (categoria) ? [categoria]: [] });
  }

  const regex =  new RegExp(termino, 'i');

  const [cantidad, categorias] = await Promise.all([
    await CategoriasModel.find({nombre: regex, estado: true}).countDocuments(),
    await CategoriasModel.find({nombre: regex, estado: true}).populate({path: 'usuario', select:'nombre'}),
  ]);

  res.status(200).json({cantidad, resultados: categorias})

}

module.exports = {
  buscar,
};
