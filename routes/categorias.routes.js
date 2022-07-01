const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");

const {
  reqValidations,
  jwtValidation,
  roleValidator,
} = require("../middlewares");

const {
  crearCategoria,
  listarCategorias,
  buscarCategoriaById,
  actualizarCategotia,
  eliminarCategoria
} = require("../controllers/categorias.controller");

const {
  validateCategoriaNotExist,
  validateCategoriaById
} = require("../helpers/db-validators");

//obtener todas las cateorias
router.get("/", listarCategorias);

//obtener una categoria por id
router.get(
  "/:id",
  [check("id", "id de categoria no valido").isMongoId().custom(validateCategoriaById), reqValidations],
  buscarCategoriaById
);

//crear categoria - privado - necesita token valido
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio")
      .notEmpty()
      .custom(validateCategoriaNotExist),
    jwtValidation,
    reqValidations,
  ],
  crearCategoria
);

//actualiar categoria por ID
router.put(
  "/:id",
  [
    check("id", "id de categoria no valido").isMongoId().custom(validateCategoriaById),
    check("nombre", "el nombre es obligatorio")
      .notEmpty()
      .custom(validateCategoriaNotExist),
    reqValidations,
    jwtValidation,
    roleValidator("ADMIN_ROLE"),
  ],
  actualizarCategotia
);

//eliminar categoria por ID Admin
router.delete("/:id", [check("id", "id de categoria no valido").isMongoId().custom(validateCategoriaById),
  reqValidations,
  jwtValidation,
  roleValidator("ADMIN_ROLE")],
  eliminarCategoria
  );
module.exports = router;
