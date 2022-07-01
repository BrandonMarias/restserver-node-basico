const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");

const {
  reqValidations,
  jwtValidation,
  roleConfirmation,
} = require("../middlewares");

const {
  validateCategoriaById,
  validateProductoById,
  validateProductoNotExist,
} = require("../helpers/db-validators");

const {
  buscarCategoriaById,
  crearProducto,
  listarProductos,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controller");

router.post(
  "/",
  [
    check("nombre", "nombre no valido")
      .notEmpty()
      .isString()
      .custom(validateProductoNotExist),
    check("categoria", "categoria no valida")
      .isMongoId()
      .custom(validateCategoriaById),
    check("precio").isNumeric(),
    check("stock").isNumeric(),
    reqValidations,
    jwtValidation,
  ],
  crearProducto
);

router.get("/", listarProductos);

router.get(
  "/:id",
  [
    check("id", "id no valido").isMongoId().custom(validateProductoById),
    reqValidations,
  ],
  buscarCategoriaById
);

router.put(
  "/:id",
  [
    check("id", "id no valido").isMongoId().custom(validateProductoById),
    check("categoria").custom(validateCategoriaById),
    reqValidations,
    jwtValidation,
    roleConfirmation("ADMIN_ROLE"),
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    check("id", "id no valido").isMongoId().custom(validateProductoById),
    reqValidations,
    jwtValidation,
    roleConfirmation("ADMIN_ROLE"),
  ],
  eliminarProducto
);

module.exports = router;
