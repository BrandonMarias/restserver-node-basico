const { Router } = require("express");

const router = Router();

const { buscar } = require("../controllers/buscar.controller");

router.get("/:coleccion/:termino", [], buscar);

module.exports = router;
