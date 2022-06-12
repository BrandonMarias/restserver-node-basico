const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");

const { postAuth, googleSingIn } = require("../controllers/auth.controller");
const { reqValidations } = require("../middlewares/reqValidations");
const { validateEmailNoExist } = require("../helpers/db-validators");

router.post(
  "/login",
  [
    check("email").isEmail().custom(validateEmailNoExist),
    check("password", "contraseña no valida").notEmpty(),
    reqValidations,
  ],
  postAuth
);

router.post(
  "/google",
  [
    check("id_token", "el token de google es necesario").notEmpty(),
    reqValidations,
  ],
  googleSingIn
);

module.exports = router;
