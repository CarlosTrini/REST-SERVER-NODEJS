const router = require("express").Router();
const { check } = require("express-validator");

const { coleccionesPermitidas } = require("../helpers/");
const { validacionesCampos, validarArchivo } = require("../middlewares/");
const { cargarArchivos, actualizarArchivo, mostrarImagen, actualizarArchivoCloudinary } = require("../controllers/");

router.get(
  "/:coleccion/:id",
  [
    check("id", "Este no es un id válido").isMongoId(),
    check("coleccion", "no se permite esta categoria").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validacionesCampos,
  ],
  mostrarImagen
);

router.post("/", cargarArchivos);

router.put(
  "/:coleccion/:id",
  [
    check("id", "Este no es un id válido").isMongoId(),
    check("coleccion", "no se permite esta categoria").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarArchivo,
    validacionesCampos,
  ],
  // actualizarArchivo
  actualizarArchivoCloudinary
);

module.exports = router;
