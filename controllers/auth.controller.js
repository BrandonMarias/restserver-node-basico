const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { jwtGenerator } = require("../helpers/jwtGenerator");
const { googleVerify } = require("../helpers/google-verify");
const { response } = require("express");

const postAuth = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msj: "contraseña incorrecta",
      });
    }

    const token = await jwtGenerator(user.id);

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "algo salio mal",
    });
  }
};

const googleSingIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { img, name, email } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        img,
        password: ":p",
        role: 'USER_ROLE'
      };

      user = new User(data);

      await user.save();
    }

    if (!user.estado) {
      return res.status(401).json({
        msg: "usuario eliminado",
      });
    }

    const token = await jwtGenerator(user.id);

    return res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      msg: "el token no se pudo verificar",
    });
  }
};

module.exports = {
  postAuth,
  googleSingIn,
};
