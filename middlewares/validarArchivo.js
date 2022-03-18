const validarArchivo = (req, res , next) => {
  console.log(req.files)
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo)
    return res.status(400).json({msg:"No se recibió archivo alguno"});

    next();
}

module.exports = {
  validarArchivo
}