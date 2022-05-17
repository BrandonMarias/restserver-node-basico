const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const {
  jwtValidation,
  reqValidations,
  roleValidator,
} = require("../middlewares");

const {
  validateRole,
  validateEmailExist,
  valodateUserId,
} = require("../helpers/db-validators");

const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users.controller");

router.get("/", getUsers);

router.put(
  "/:id",
  [
    check("id", "ID invalido").isMongoId().custom(valodateUserId),
    reqValidations,
  ],
  putUsers
);

router.post(
  "/",
  [
    check("email", "correo no valido").isEmail().custom(validateEmailExist),
    check("name", "El nombre el obligatorio").not().isEmpty(),
    check("password", "contraseñ no aceptable").isLength({ min: 8 }),
    // check('role', 'role no valido').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(validateRole),
    reqValidations,
  ],
  postUsers
);

router.delete(
  "/:id",
  [
    jwtValidation,
    roleValidator("USER_ROLE"),
    check("id", "ID invalido").isMongoId().custom(valodateUserId),
    reqValidations,
  ],
  deleteUsers
);

router.patch("/", patchUsers);

module.exports = router;
