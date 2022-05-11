const { Router } = require("express");
const router = Router();
const {check} = require('express-validator')

const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users.controller");

router.get("/", getUsers);

router.put("/:id", putUsers);

router.post("/", [
  check('email', 'correo no valido').isEmail()
] ,postUsers);

router.delete("/", deleteUsers);

router.patch("/", patchUsers);

module.exports = router;
