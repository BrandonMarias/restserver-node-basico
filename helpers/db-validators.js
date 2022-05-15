const Role = require("../models/role");
const User = require("../models/user");

const validateRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });

  if (!roleExist) {
    throw new Error(`Error: el role ${role} no esta definido`);
  }
};

const validateEmailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error("Error: el email ya existe");
  }
};

const validateEmailNoExist = async (email = "") => {
  const userEmail = await User.findOne({ email });

  if (!userEmail) {
    throw new Error("El correo no existe");
  } else if (!userEmail.estado) {
    throw new Error("Usuario inactivo");
  }
};

const valodateUserId = async (id = "") => {
  const IdExist = await User.findById(id);
  if (!IdExist) {
    throw new Error("el ID no existe");
  }
};

module.exports = {
  validateRole,
  validateEmailExist,
  valodateUserId,
  validateEmailNoExist,
};
