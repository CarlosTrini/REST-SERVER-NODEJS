const {model, Schema} = require('mongoose');

const RoleSchema = new Schema({
  "role":{
    type:String,
    required: [true, 'El rol es requerido']
  }
});

module.exports = model.roles || model('Role', RoleSchema);