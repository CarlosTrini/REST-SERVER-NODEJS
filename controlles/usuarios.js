const { response } = require("express");
const bcrypt = require("bcryptjs");

const UsuarioModel = require("../models/usuarios"); //modelo

//*************************** GET **************************
const usuariosGet = async(req, res = response) => {
  const {limite = 5, desde= 0} = req.query;
  const usuarios = await UsuarioModel.find()
  .skip(Number(desde))
  .limit(Number(limite));
  res.json({usuarios });
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

//************** D*************ELETE **************************
const usuariosDelete = (req, res = response) => {
  res.json({ msg: "DELETE FROM CONTROLLER" });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
