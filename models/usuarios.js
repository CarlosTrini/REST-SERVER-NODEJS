const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "el nombre es obligatorio"],
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    img: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN_ROLE", "USER_ROLE"],
    },
    estado: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//ES UNA MANERA DE EVITAR QUE AL INSERTAR UN USUARIO, NOS RETORNE SU PASSWORD Y SU VERSIÓN... 
// ES NECESARIO USAR UNA FUNCIÓN DE DECLARACIÓN YA QUE SE HACE USO DE "THIS"
usuarioSchema.methods.toJSON  = function() {
  const {__v, password, ...usuario} = this.toObject(); 
  return usuario;
}

module.exports = mongoose.model.Usuario || mongoose.model("Usuario", usuarioSchema);
