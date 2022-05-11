/*

name,       s
email,      s
password,   s
img,    s
role,   s
estado,  boolean
google,  boolean


*/

const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "el nombre el obligatorio"],
  },
  email: {
    type: String,
    required: [true, "el coorreo el obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "la contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Users', usuarioSchema)
