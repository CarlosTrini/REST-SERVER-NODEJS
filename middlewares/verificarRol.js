const {request, response} = require('express');

const verificarRol = (req = request, res = response, next) => {
  
  if(!req.usuario) return res.status(500).json({msg: 'Se está intentando verificar el rol de un usuario autenticado, sin antes haber validado el token'});
  
  const {role, nombre} = req.usuario;
  if(role !== 'ADMIN_ROLE') return res.status(401).json(`El usuario ${nombre} no cuenta con los permisos. No es administrador`);

  next();
}

module.exports = {verificarRol};