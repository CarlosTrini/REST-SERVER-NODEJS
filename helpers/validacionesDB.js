const RoleModel = require("../models/roles");
const UsuarioModel = require("../models/usuarios");

const esRoleValido = async (role = "") => {
  //verifica que el role exista
  const existeRole = await RoleModel.findOne({ role });
  if (!existeRole)
    throw new Error(`Este rol '${role}' no está registrado en la D.B. `);
};

const emailExiste = async(correo = '') => {
   //verifica que el correo exista
   const existe = await UsuarioModel.findOne({correo});
   if(existe) throw new Error('Este correo ya está registrado...');
}

const usuarioExistePorId = async(id = '') => {
  // verifica que el id corresponda a algún usuario
  const existe = await UsuarioModel.findById(id);
  if(!existe) throw new Error(`Este ID no corresponde a ningún usuario: ${id}`);
}

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExistePorId
}
