const router = require('express').Router();
const {check} = require('express-validator');

const {validacionesCampos} = require('../middlewares/validacionesCampos');
const {authLogin} = require('../controlles/auth');

router.post('/login', 
  [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'Contraseña inválida').not().isEmpty(),
    validacionesCampos
  ],
   authLogin);

module.exports = router;