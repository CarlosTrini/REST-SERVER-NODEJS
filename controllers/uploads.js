const path = require('path');
const fs = require('fs');

const { request, response } = require("express");
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers/");
const { UsuarioModel, ProductoModel } = require("../models/");


const mostrarImagen = async(req = request, res = response) => {
  const { coleccion, id } = req.params;

  let modelo = "";

  switch (coleccion) {
    case "productos":
      modelo = await ProductoModel.findById(id).limit(1);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `Este id: ${id} no corresponde a ningún producto` });
      break;
    case "usuarios":
      modelo = await UsuarioModel.findById(id).limit(1);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `Este id: ${id} no corresponde a ningún usuario` });
      break;

    default:
      return res
        .status(500)
        .json(
          "Esta categoría no está válidada aún... Hable con el administrador"
        );
  }

  // Revisar si imagen existe... si la imagen no existe, se retorna una imagen default
  if(modelo.img){
    const pathName = path.join(__dirname, '../uploads', coleccion, modelo.img);

    if(!fs.existsSync(pathName)) {
      const defaultPath = path.join(__dirname, '../uploads/img', '02711a13-56e7-40ee-88f7-22dd350c188a.jpg' );

    return  res.status(400).sendFile(defaultPath);
    }
    return res.status(200).sendFile(pathName);
    
  }

    return res.status(200).json({ msg: 'No hay imagen para mostrar' });
}


const cargarArchivos = async (req = request, res = response) => {
  try {
    // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    const nombre = await subirArchivo(req.files, undefined, "img");
    res.status(200).json({ nombre});
  } catch (error) {
    return res.status(200).json({ msg: error });
  }
};

const actualizarArchivo = async (req = request, res = response) => {
  const { coleccion, id } = req.params;

  let modelo = "";

  switch (coleccion) {
    case "productos":
      modelo = await ProductoModel.findById(id).limit(1);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `Este id: ${id} no corresponde a ningún producto` });
      break;
    case "usuarios":
      modelo = await UsuarioModel.findById(id).limit(1);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `Este id: ${id} no corresponde a ningún usuario` });
      break;

    default:
      return res
        .status(500)
        .json(
          "Esta categoría no está válidada aún... Hable con el administrador"
        );
  }


  //eliminar imagen previa del usuario/producto
  if(modelo.img){
    const pathName = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if(fs.existsSync(pathName)) fs.unlinkSync(pathName);
  }

  try {
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    modelo.save();
    return res.status(200).json({ msg: modelo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error });
  }
};


const actualizarArchivoCloudinary = async (req = request, res = response) => {
  const { coleccion, id } = req.params;

  let modelo = "";

  switch (coleccion) {
    case "productos":
      modelo = await ProductoModel.findById(id).limit(1);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `Este id: ${id} no corresponde a ningún producto` });
      break;
    case "usuarios":
      modelo = await UsuarioModel.findById(id).limit(1);
      if (!modelo)
        return res
          .status(400)
          .json({ msg: `Este id: ${id} no corresponde a ningún usuario` });
      break;

    default:
      return res
        .status(500)
        .json(
          "Esta categoría no está válidada aún... Hable con el administrador"
        );
  }


  //eliminar imagen previa del usuario/producto de cloudinary
  if(modelo.img){
    const imgArr = modelo.img.split('/');
    const imgNombre = imgArr[imgArr.length -1];
    const [public_id] = imgNombre.split('.');
    cloudinary.uploader.destroy(public_id);
  }


  
  try {
    const {tempFilePath} = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);


    modelo.img = secure_url;
    modelo.save();
    return res.status(200).json({ msg: modelo });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error });
  }
};


module.exports = {
  cargarArchivos,
  actualizarArchivo,
  actualizarArchivoCloudinary,
  mostrarImagen 
};

