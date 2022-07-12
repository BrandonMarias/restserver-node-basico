const { Categoria, Producto, Users } = require("../models");

const roleValidator = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "error al validar role",
      });
    }

    const { role } = req.user;
    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: "error de autorización (role)",
      });
    }

    next();
  };
};

const roleConfirmation = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "error al validar role",
      });
    }

    const { role } = req.user;
    if (!roles.includes(role)) {
      req.roleConfirmation = false;
    } else {
      req.roleConfirmation = true;
    }
    next();
  };
};

const ownerConfirmation = (coleccion = "") => {
  return async (req, res, next) => {
    if (!coleccion && !req.params.coleccion) {
      return res.status(500).json({ msg: "error owner confirmation" });
    }
    if (!coleccion) {
      coleccion = req.params.coleccion;
    }
    const { id } = req.params;
    const _id = req.user._id.toString();
    req.owner = false;
    if (!id || !_id) {
      return res.status(500).json({ msg: "error owner confirmation" });
    }
    switch (coleccion) {
      case "user":
        const usuario = await Users.findById(id);
        if (!usuario) {
          return res.status(500).json({ msg: "usuario no encontrado" });
        }
        if (id === _id) {
          req.owner = usuario;
        }
        break;
      case "producto":
        const producto = await Producto.findById(id);
        if (!producto) {
          return res.status(500).json({ msg: "producto no encontrado" });
        }
        console.log(producto);
        if (producto.user === _id) {
          req.owner = producto;
        }
        break;
      case "categoria":
        const categoria = await Categoria.findById(id);
        if (!categoria) {
          return res.status(500).json({ msg: "categoria no encontrada" });
        }
        if (categoria.id === _id) {
          req.owner = categoria;
        }
        break;
      default:
        return res.status(500).json({ msg: "coleccion no implementada" });
    }

    next();
  };
};

const ownerAndRoleConfirmation = (req, res, next) => {
  const { owner, roleConfirmation } = req;
  if (!owner && !roleConfirmation) {
    return res
      .status(401)
      .json({ msg: "error de autorizacion", owner, roleConfirmation });
  }
  next();
};

module.exports = {
  roleValidator,
  roleConfirmation,
  ownerConfirmation,
  ownerAndRoleConfirmation,
};
