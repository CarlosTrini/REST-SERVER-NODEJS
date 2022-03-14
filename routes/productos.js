const router = require("express").Router();
const { check } = require("express-validator");

const {
  validacionesCampos,
  verificarRol,
  verificarToken,
} = require("../middlewares/");

// const {
//   existeProducto,
//   existeCategoria,
// } = require("../helpers/existeProducto");
const {
  existeCategoriaNombre,
  existeProducto,
  existeProductoNombre,
  existeCategoria,
} = require("../helpers/");

const {
  productosGet,
  productosGetId,
  productosPost,
  productosPut,
  productosDelete,
} = require("../controllers");

// OBTENER TODOS LOS PRODUCTOS - PAGINADOS  - PÚBLICO
router.get("/", productosGet);

// OBTENER PRODUCTO POR ID - PÚBLICO
router.get(
  "/:id",
  [
    check("id", "Este ID no es válido").isMongoId(),
    check("id").custom(existeProducto),
    validacionesCampos,
  ],
  productosGetId
);

//GUARDAR NUEVO PRODUCTO - PRIVADO - ACCESO CON TOKEN
router.post(
  "/",
  [
    verificarToken,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(existeProductoNombre),
    check("categoria", "La categoría es obligatoría").not().isEmpty(),
    check("categoria").custom(existeCategoriaNombre),
    validacionesCampos,
  ],
  productosPost
);

// ACTUALIZAR UN PRODUCTO - PRIVADO - ACCESO CON TOKEN
router.put(
  "/:id",
  [
    verificarToken,
    check("id", "Este ID no es válido").isMongoId(),
    check("id").custom(existeProducto),
    check("categoria", "La categoría es obligatoria").not().isEmpty(),
    check("categoria").custom(existeCategoriaNombre),
    validacionesCampos,
  ],
  productosPut
);

//ELIMINAR UN PRODUCTO - PRIVADO - ACCESO CON TOKEN - ROLE "ADMIN_ROLE"
router.delete(
  "/:id",
  [
    verificarToken,
    verificarRol,
    check("id", "Este ID no es válido").isMongoId(),
    check("id").custom(existeProducto),
    validacionesCampos,
  ],
  productosDelete
);

module.exports = router;

// nombre
// estado
// usuario
// precio
// categoria
// descripcion
// disponible
