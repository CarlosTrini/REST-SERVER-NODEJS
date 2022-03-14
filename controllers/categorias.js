const { response } = require("express");

const { CategoriasModel } = require("../models");

const categoriasGet = async (req, res = response) => {
  let limite = Number(req.query.limit) || 1; //si limit NO es enviado se asigna 1
  limite = (limite < 1) ? 1 : limite; // si limit SI es enviado pero es menor a 1, se asigna 1

  let pagina =  Number(req.query.page) ||0 ; //si page NO es enviada se asigna 0 PORQUE 0 ES LA PRINCIPAL
  pagina = (pagina < 0 ) ? 0 : pagina; // si page SI es enviada pero menor a 0, se asigna 0 PORQUE 0 ES LA PRINCIPAL

  const salto = (limite * pagina); //indica en la consulta cuantos registros se salta en cada página

  const [totalDocumentos, categorias] = await Promise.all([
    await CategoriasModel.find({estado:true}).countDocuments(),
    await CategoriasModel.find({estado:true}).populate('usuario', 'nombre').limit(limite).skip(salto)
  ]); 

  const totalPaginas = Math.ceil(totalDocumentos / limite) - 1; // es -1 PORQUE 0 es desde donde se inicia el conteo
  const siguientePagina = pagina < totalPaginas ? pagina+1 : pagina;
  const anteriorPagina = pagina > 0 ? pagina -1 : 0;

  res.status(200).json({
    limite,
    totalCategorias: totalDocumentos,
    totalPaginas,
    paginaActual:pagina,
    siguientePagina,
    anteriorPagina,
    categorias,
  });
};

const categoriasGetId = async(req, res = response) => {
  const {id} = req.params;
  const categoria = await CategoriasModel.findById(id).populate('usuario', 'nombre');
  res.status(200).json({ categoria});
};

const categoriasPost = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  //verificar si la categoría ya existe
  const categoria = await CategoriasModel.findOne({ nombre });
  if (categoria)
    return res
      .status(400)
      .json({ msg: `Esta categoría: ${nombre}, ya existe` });

  //generar data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  //almacenar en la base de datos
  const nuevaCategoria = new CategoriasModel(data);
  await nuevaCategoria.save();

  res.status(201).json({ nuevaCategoria });
};

const categoriasPut = async(req, res = response) => {
  const {id} = req.params;
  let nuevoNombre = req.body.nombre;
  nuevoNombre.toUpperCase();

  const existeCategoria = await CategoriasModel.findOne({nombre: nuevoNombre});
  
  // TODO: verificar si la categoria ya existe con este nombre y su estado
  if(existeCategoria) return  res.status(400).json(`La categoría ${nuevoNombre} ya existe `);

  const categoria = await CategoriasModel.findById(id);
  if(categoria && !(categoria.estado)) return res.status(401).json('Esta categoría no se puede actualizar, hable con el administrado');

  // actualizar
  const data = {
    nombre:nuevoNombre,
    usuario: req.usuario._id
  }
  const actualizada = await CategoriasModel.findOneAndUpdate({_id: id}, data, {new: true} );
  res.status(200).json({ actualizada});
};

const categoriasDelete = async(req, res = response) => {
  const {id} = req.params;
  const eliminado = await CategoriasModel.findOneAndUpdate({_id:id}, {estado: false}, {new: true});
  res.status(200).json({ eliminado });
};

module.exports = {
  categoriasGet,
  categoriasGetId,
  categoriasPost,
  categoriasPut,
  categoriasDelete,
};
