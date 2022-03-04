const express = require('express');
const router = express.Router();

const {usuariosGet, usuariosPost, usuariosPatch, usuariosPut, usuariosDelete} = require('../controlles/usuarios');

router.get('/', usuariosGet);

router.post('/', usuariosPost);

router.put('/', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;