const router = require("express").Router();
const { check } = require("express-validator");

const {validacionesCampos} = require("../middlewares/");
// const { validacionesCampos } = require("../middlewares/validacionesCampos");

// const { authLogin, googleSignIn } = require("../controlles/auth");
const { authLogin, googleSignIn } = require("../controllers/");


router.post("/login",
  [
    check("correo", "El correo no es válido").isEmail(),
    check("password", "Contraseña inválida").not().isEmpty(),
    validacionesCampos,
  ],
  authLogin
);

router.post("/google",
  [
    //id_token = token que da google en el front
    check("id_token", "id_token no fue enviado y es necesario").not().isEmpty(),
    validacionesCampos,
  ],
  googleSignIn
);

module.exports = router;
