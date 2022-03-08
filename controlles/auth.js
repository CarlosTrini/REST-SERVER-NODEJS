const { response } = require('express');
const bcrypt = require('bcryptjs');

const UsuarioModel = require('../models/usuarios');
const { generarJwt } = require('../helpers/generarJwt');

const authLogin = async(req, res = response) => {
  const {correo, password} = req.body;

  try {

    //verificar si el correo existe
    const usuario = await UsuarioModel.findOne({correo});
    if(!usuario) return res.status(400).json({msg: 'Usuario / Password no son correctos - correo mal'});

    //verificar si el usuario está activo
    if(!usuario.estado) return res.status(400).json({msg: 'Usuario / Password no correctos  - estado false'});
    
    //verificar la contraseña
    const pass = bcrypt.compareSync(password, usuario.password);
    if(!pass) return res.status(400).json({msg: 'Usuario / Password no correctos - contraseña incorrecta'});

    //generar el JWT
    const jwt = await generarJwt(usuario._id);

    res.json({msg: 'login auth', jwt});
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: 'Hable con el administrador'})
  }
  
}


module.exports = {authLogin}