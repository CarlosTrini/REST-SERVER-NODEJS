const { response } = require("express");
const bcrypt = require("bcryptjs");

const {UsuarioModel} = require("../models"); //modelo

//*************************** GET **************************
const usuariosGet = async(req, res = response) => {
  const {limite = 5, desde= 0} = req.query;
  const queryFilter = {estado: true} //estado 'false' son aquellos que están 'eliminados' de manera lógica

  // const usuariosInfo = await UsuarioModel.find(queryFilter).skip(Number(desde)).limit(Number(limite));
  // const usuariosCount = await UsuarioModel.countDocuments(queryFilter); //solo trae con estado 'true'
  const [usuariosInfo, usuariosCount] = await Promise.all([
    UsuarioModel.find(queryFilter).skip(Number(desde)).limit(Number(limite)),
    UsuarioModel.countDocuments(queryFilter)
  ]);

  res.json({total: usuariosCount, usuarios: usuariosInfo });

};


//*************************** POST **************************
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new UsuarioModel({ nombre, correo, password, role });

  // encriptar la contraseña
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);

  // guardar en db
  await usuario.save();

  res.json({ msg: "usuario almacenado", usuario });
};


//***************************  PUT **************************
const usuariosPut = async (req, res = response) => {
  const { id } = req.query;
  const { password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await UsuarioModel.findOneAndUpdate(id, resto, { new: true });

  res.json({ msg: "PUT CONTROLLER", usuario });
};


//************** *************PATCH **************************
const usuariosPatch = (req, res = response) => {
  res.json({ msg: "PATCH FROM CONTROLLER" });
};


//************** ************DELETE **************************
const usuariosDelete = async(req, res = response) => {
  const {id} = req.query;
  const {uid, usuario} = req;

  const usuarioBorrado = await UsuarioModel.findOneAndUpdate(id, {estado: false}, {new: true}); //eliminado lógico
  // const usuarioBorradoFisico = await UsuarioModel.findOneAndDelete(id, {new:true}); //eliminado fisico

  
  
  res.json({ msg: "DELETE FROM CONTROLLER", usuarioBorrado });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
