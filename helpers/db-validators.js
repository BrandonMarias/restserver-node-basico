const { Categoria, Role, Users, Producto } = require("../models");

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

const validateCategoriaById = async (id = "") => {
  if (!id) {
    return;
  }
  const IdExist = await Categoria.findOne({ _id: id, estado: true });
  if (!IdExist) {
    throw new Error("la categoria no existe");
  }
};

const validateProductoById = async (id = "") => {
  const IdExist = await Producto.findOne({ _id: id, estado: true });
  if (!IdExist) {
    throw new Error("el producto no existe");
  }
};

const validateCategoriaNotExist = async (nombre = "") => {
  nombre = nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    throw new Error("categoria ya existe");
  }
};

const validateProductoNotExist = async (nombre = "") => {
  nombre = nombre.toUpperCase();
  const producto = await Producto.findOne({ nombre });

  if (producto) {
    throw new Error("categoria ya existe");
  }
};

module.exports = {
  validateRole,
  validateUserId,
  validateEmailExist,
  validateEmailNoExist,
  validateProductoById,
  validateCategoriaById,
  validateCategoriaNotExist,
  validateProductoNotExist,
};
