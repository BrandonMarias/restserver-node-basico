const {Categoria, Role, Users} = require("../models");

const validateRole = async (role = "") => {
  const roleExist = await Role.findOne({ role });

  if (!roleExist) {
    throw new Error(`Error: el role ${role} no esta definido`);
  }
};

const validateEmailExist = async (email = "") => {
  const emailExist = await Users.findOne({ email });

  if (emailExist) {
    throw new Error("Error: el email ya existe");
  }
};

const validateEmailNoExist = async (email = "") => {
  const userEmail = await Users.findOne({ email });

  if (!userEmail) {
    throw new Error("El correo no existe");
  } else if (!userEmail.estado) {
    throw new Error("Usuario inactivo");
  }
};

const validateUserId = async (id = "") => {
  const IdExist = await Users.findById(id);
  if (!IdExist) {
    throw new Error("el ID no existe");
  }
};

const validateCategoriaExist = async(nombre = "") => {
  nombre = nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({nombre})

  if (!categoriaDB) {
    throw new Error("categoria no existe")
  }

}

const validateCategoriaNotExist = async(nombre = "") => {
  nombre = nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({nombre})

  if (categoriaDB) {
    throw new Error("categoria ya existe")
  }

}

module.exports = {
  validateRole,
  validateUserId,
  validateEmailExist,
  validateEmailNoExist,
  validateCategoriaExist,
  validateCategoriaNotExist
};
