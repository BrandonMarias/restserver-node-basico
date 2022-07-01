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
    default: "USER_ROLE"
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  }
});

usuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("Users", usuarioSchema);
