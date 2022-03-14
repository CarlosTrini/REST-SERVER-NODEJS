const router = require("express").Router();
const { check } = require("express-validator");

const { validacionesCampos, verificarToken, verificarRol } = require("../middlewares/");
// const { existeCategoria } = require("../helpers/existeCategoria");
const {existeCategoria} = require('../helpers');

// const {
//   categoriasGet,
//   categoriasGetId,
//   categoriasPost,
//   categoriasPut,
//   categoriasDelete,
// } = require("../controllers/categorias");

const {
  categoriasGet,
  categoriasGetId,
  categoriasPost,
  categoriasPut,
  categoriasDelete,
} = require("../controllers/");

//catogorias
router.get("/", categoriasGet);

//publico - categorias por id
router.get(
  "/:id", 
  [
    check("id", "Este no es un ID válido").isMongoId(),
    check("id").custom(existeCategoria),
    validacionesCampos,
  ],
  categoriasGetId
);

//privado solo acceso a persona con token
router.post(
  "/",
  [
    verificarToken,
    check("nombre", "El nombre de la categoría es obligatorio").not().isEmpty(),
    validacionesCampos,
  ],
  categoriasPost
);

//privado - solo acceso con token
router.put(
  "/:id",
  [
    verificarToken,
    check("id", "Este no es un ID válido").isMongoId(),
    check("id").custom(existeCategoria),
    check("nombre", 'El nombre es obligatorio').not().isEmpty(),
    validacionesCampos,
  ],
  categoriasPut
);

//privado - solo acceso a persona con token y rol de 'ADMIN_ROLE'
router.delete(
  "/:id",
  [
    verificarToken,
    verificarRol,
    check("id", "Este no es un ID válido").isMongoId(),
    check("id").custom(existeCategoria),
    validacionesCampos
  ],
  categoriasDelete
);

module.exports = router;
