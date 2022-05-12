const { Schema, model } = require("mongoose");

const roleSchema = Schema({
  role: {
    type: String,
    required: [true, "el role es obligatorio"],
  },
});

module.exports = model("roles", roleSchema);
