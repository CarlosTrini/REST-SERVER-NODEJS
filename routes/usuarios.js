const router = require("express").Router();
const { check } = require("express-validator");

// const {
//   esRoleValido,
//   emailExiste,
//   usuarioExistePorId,
// } = require("../helpers/validacionesDB");

const {usuarioExistePorId, esRoleValido, emailExiste} = require('../helpers/');

const {
  validacionesCampos,
  verificarToken,
  verificarRol,
} = require("../middlewares");

// const {
//   usuariosGet,
  // usuariosPost,
  // usuariosPatch,
  // usuariosPut,
  // usuariosDelete,
// } = require("../controlles/usuarios");

const {usuariosGet,  
   usuariosPost,
  usuariosPatch,
  usuariosPut,
  usuariosDelete,} = require('../controllers/');

router.get("/", usuariosGet);

router.post("/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y mínimo de 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(esRoleValido),
    validacionesCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "Este no es un ID válido").isMongoId(),
    check("id").custom(usuarioExistePorId),
    check("role").custom(esRoleValido),
    validacionesCampos,
  ],
  usuariosPut
);

router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    verificarToken,
    verificarRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioExistePorId),
  ],
  usuariosDelete
);

module.exports = router;
