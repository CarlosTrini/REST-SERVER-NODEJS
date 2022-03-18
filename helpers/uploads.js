const path = require("path");
const { v4: uuidv4 } = require("uuid");

const extensionValidas = ["png", "jpg", "jpeg", "gif"];

const subirArchivo = (files, extensiones = extensionValidas, carpeta='') => {
  return new Promise((resolve, reject) => {
    
    const { archivo } = files;

    //sacar la extensión
    const nombreSplit = archivo.name.split(".");
    const extension = nombreSplit[nombreSplit.length - 1];

    if (!extensiones.includes(extension))
      reject(
        `Esta extensión: ${extension} no es válida. Extensiones permitidas: ${extensiones}`
      );

    const nombreTmp = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../uploads/" + `${carpeta}/` + nombreTmp
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(nombreTmp);
    });
  }); //cierre promesa
};

module.exports = {subirArchivo};
