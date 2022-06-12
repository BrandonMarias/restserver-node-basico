const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtValidation = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "sin autorización",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATEKEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "usuario no existe en DB",
      });
    }

    if (!user.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuairo eliminado",
        user,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      msg: "token no valido",
    });
  }
};

module.exports = { jwtValidation };
