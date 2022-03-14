const {Schema, model} = require('mongoose');

const ProductoSchema = new Schema({
  nombre: {
    type:String,
    required: true
  },
  estado:{
    type: Boolean,
    default: true,
    required: true 
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  precio: {
    type: Number,
    default: 0,
    required: true
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  descripcion: {
    type: String,
    default: 'Aún sin descripción'
  },
  disponible: {
    type: Boolean,
    default:true
  }
});

ProductoSchema.methods.toJSON = function(){
  const {__v, estado, ...data} = this.toObject();
  return data;
}

module.exports = model.Producto || model('Producto', ProductoSchema);

