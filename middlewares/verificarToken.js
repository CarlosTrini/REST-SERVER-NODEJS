const {request, response} = require('express');
const jwt = require('jsonwebtoken');

const UsuarioModel = require('../models/usuarios');

const verificarToken = async(req = request, res =response, next) => {
  const token = req.header('Authorization');
  
  if(!token) return  res.status(401).json({msg: 'El token no ha sido enviado'});

  try {
    //verificando que el token sea correcto
    const {uid} = jwt.verify(token , process.env.SECRET_KEY);
    req.uid = uid;

    //extrayendo datos del usuario que se autentico...
    const usuario = await UsuarioModel.findById(uid);

    //verificando que el usuario no sea null o undefined
    if( !usuario ) return res.status(400).json({msg: 'Este usuario no existe en la base de datos'});

    //verificar que el estatus del usuario sea true
    if( !usuario.estado ) return res.status(401).json({msg: 'Token no válido - usuario está dado de baja'});

    req.usuario = usuario;
    
    next();
  } catch (err) {
    console.log(err);  
    res.status(500).json('Este token no es válido');
  }
  
}

module.exports = {verificarToken};