const { Router } = require("express");

const { check } = require("express-validator");

const {
  reqValidations,
  jwtValidation,
  ownerConfirmation,
  roleConfirmation,
  ownerAndRoleConfirmation,
  validarArchivoInReq,
} = require("../middlewares");

const router = Router();

const {
  cargarArchivo,
  actualizarImg,
  mostrarImg,
} = require("../controllers/uploads.controller");

router.post("/", [validarArchivoInReq], cargarArchivo);
router.put(
  "/:coleccion/:id",
  [
    validarArchivoInReq,
    check("id", "iid no valido").isMongoId(),
    check("coleccion", "coleccion no valida").isIn(["user", "producto"]),
    reqValidations,
    jwtValidation,
    ownerConfirmation(),
    roleConfirmation("ADMIN_ROLE"),
    ownerAndRoleConfirmation,
  ],
  actualizarImg
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "iid no valido").isMongoId(),
    check("coleccion", "coleccion no valida").isIn(["user", "producto"]),
    reqValidations,
  ],
  mostrarImg
);

module.exports = router;
