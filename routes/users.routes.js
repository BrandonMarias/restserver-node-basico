const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { validationResult } = require("express-validator");

const  fieldValidation  = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

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

router.put("/:id", [
  check('id', 'ID invalido').isMongoId().custom(valodateUserId),
  fieldValidation
], putUsers);

router.post(
  "/",
  [
    check("email", "correo no valido").isEmail().custom(validateEmailExist),
    check("name", "El nombre el obligatorio").not().isEmpty(),
    check("password", "contraseñ no aceptable").isLength({ min: 8 }),
    // check('role', 'role no valido').isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(validateRole),
    fieldValidation,
  ],
  postUsers
);

router.delete("/:id", [
  check('id', 'ID invalido').isMongoId().custom(valodateUserId),
  fieldValidation
] , deleteUsers);

router.patch("/", patchUsers);

module.exports = router;
