const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const {UsuarioModel} = require("../models");
const { generarJwt } = require("../helpers/generarJwt");
const { googleVerify } = require("../helpers/googleVerify");

const authLogin = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar si el correo existe
    const usuario = await UsuarioModel.findOne({ correo });
    if (!usuario)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - correo mal" });

    //verificar si el usuario está activo
    if (!usuario.estado)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no correctos  - estado false" });

    //verificar la contraseña
    const pass = bcrypt.compareSync(password, usuario.password);
    if (!pass)
      return res.status(400).json({
        msg: "Usuario / Password no correctos - contraseña incorrecta",
      });

    //generar el JWT
    const jwt = await generarJwt(usuario._id);

    res.json({ msg: "login auth", jwt });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const googleSignIn = async (req = request, res = response) => {
  //ver id_token
  const { id_token } = req.body;
  try {
    //verificar el token de google
    const { nombre, correo, img } = await googleVerify(id_token);

    //verificar si el usuario existe en la base de datos
    let usuario = await UsuarioModel.findOne({ correo });

    if (!usuario) {
      //usuario no existe... crearlo
      const data = {
        nombre,
        correo,
        img,
        password: "invalid",
        google: true,
        role:'USER_ROLE'
      };
      const newUser = new UsuarioModel(data);
      await newUser.save();
    }

    //usuario de google tienes estado:false 
    if(!usuario.estado) return res.status(401).json({msg: 'Usuario dado de baja, hable con el administrador'});

    //generar el JWT
    const token = await generarJwt(usuario.id);

    res.status(200).json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error al verifcar el token" });
  }
};

module.exports = { authLogin, googleSignIn };

