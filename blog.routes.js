const { Router, response } = require("express");
const router = Router();

router.get(
  "/seccion", (req, res = response) => {
    res.sendFile("/public/seccion.html", { root: __dirname })
  }
);
router.get(
    "/hola-mundo", (req, res = response) => {
      res.sendFile("/public/hola-mundo.html", { root: __dirname })
    }
  );

module.exports = router;
