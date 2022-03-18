
const coleccionesPermitidas = (coleccion = '', coleccionesValidas = []) => {
  const existe = coleccionesValidas.includes(coleccion);
  if(!existe) throw new Error(`Esta colección: ${coleccion} no es válida: ${coleccionesValidas}`);

  return true;
}

module.exports = {
  coleccionesPermitidas
}