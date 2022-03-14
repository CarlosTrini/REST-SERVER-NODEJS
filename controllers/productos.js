const { response } = require("express");

const { ProductoModel, CategoriasModel } = require("../models/");

//------  OBTENER TODOS LOS PRODUCTOS - PAGINADOS  - PÚBLICO
const productosGet = async (req, res = response) => {
  //LA PAGINACIÓN COMIENZA DESDE CERO...
  let limite = Number(req.query.limit) || 1;
  limite = limite < 1 ? 1 : limite;
  let pagina = Number(req.query.page) || 0;
  pagina = pagina < 1 ? 0 : pagina;

  const salto = limite * pagina;

  const [totalDocumentos, productos] = await Promise.all([
    await ProductoModel.find({ estado: true }).countDocuments(),
    await ProductoModel.find({ estado: true })
      .populate({ path: "usuario", select: "nombre" })
      .populate({
        path: "categoria",
        select: "nombre usuario",
        populate: { path: "usuario", select: "nombre" },
      })
      .limit(limite)
      .skip(salto),
  ]);

  const totalPaginas = Math.ceil(totalDocumentos / limite) - 1; //es -1 PORQUE 0 es desde donde se inicia el conteo
  const siguientePagina = pagina < totalPaginas ? pagina + 1 : pagina;
  const anteriorPagina = pagina > 0 ? pagina - 1 : 0;

  res.status(200).json({
    totalProductos: totalDocumentos,
    limite,
    totalPaginas,
    siguientePagina,
    anteriorPagina,
    paginaActual: pagina,
    productos,
  });
};

//------  OBTENER PRODUCTO POR ID - PÚBLICO
const productosGetId = async (req, res = response) => {
  const { id } = req.params;

  const producto = await ProductoModel.findById(id)
    .populate({ path: "usuario", select: "nombre" })
    .populate({
      path: "categoria",
      select: "nombre usuario",
      populate: { path: "usuario", select: "nombre" },
    })
    .limit(1);

  res.status(200).json(producto);
};

//------ GUARDAR NUEVO PRODUCTO - PRIVADO - ACCESO CON TOKEN
const productosPost = async (req, res = response) => {
  let { nombre, precio, descripcion, disponible, categoria } = req.body;

  // traer categoría id
  categoria = categoria.toUpperCase();
  const categoriaSeleccionada = await CategoriasModel.findOne({
    categoria,
    estado: true,
  });

  if (!categoriaSeleccionada)
    return res
      .status(400)
      .json("Esta categoría no fue encontrada en la base de datos");

  const { _id } = categoriaSeleccionada;

  const data = {
    nombre,
    usuario: req.usuario._id,
    precio,
    categoria: _id,
  };

  const producto = new ProductoModel(data);
  await producto.save();

  res.status(200).json({ producto });
};

//------  ACTUALIZAR UN PRODUCTO - PRIVADO - ACCESO CON TOKEN
const productosPut = async (req, res = response) => {
  const {id} = req.params;
  let { nombre, estado, precio, categoria, descripcion, disponible } =
    req.body;
    
  categoria = categoria.toUpperCase();
  const categoriaId = await CategoriasModel.findOne({nombre: categoria},{_id:true}).limit(1);

  if(!categoriaId) return res.status(401).json('Ha ocurrido un error al buscar el producto, comuniquese con el área de');

  const data = {
    nombre,
    estado,
    precio,
    categoria: categoriaId._id,
    descripcion,
    disponible,
    usuario: req.usuario._id,
  };
  
  const actualizado = await ProductoModel.findOneAndUpdate({_id: id}, data, {new: true});
  res.status(200).json({actualizado});
};

//------ ELIMINAR UN PRODUCTO - PRIVADO - ACCESO CON TOKEN - ROLE "ADMIN_ROLE"
const productosDelete = async (req, res = response) => {
  const { id } = req.params;
  const eliminado = await ProductoModel.findOneAndUpdate(
    { _id: id },
    { estado: false }
  );
  res.status(200).json(eliminado);
};

module.exports = {
  productosGet,
  productosGetId,
  productosPost,
  productosPut,
  productosDelete,
};
