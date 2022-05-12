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

module.exports = { validateRole, validateEmailExist };
