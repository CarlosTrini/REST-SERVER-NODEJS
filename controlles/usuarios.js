const {response} = require('express');

const usuariosGet = (req, res = response) => {
  res.json({ msg: 'GET FROM CONTROLLER' });
}

const usuariosPost  = (req, res = response) => {
  res.json({ msg: 'POST FROM CONTROLLER' });
}

const usuariosPut = (req, res = response) => {
  res.json({ msg: 'PUT FROM CONTROLLER' });
}

const usuariosPatch = (req, res = response) => {
  res.json({ msg: 'PATCH FROM CONTROLLER' });
}

const usuariosDelete  = (req, res = response) => {
  res.json({ msg: 'DELETE FROM CONTROLLER' });
}


module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}