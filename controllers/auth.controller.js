const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const {jwtGenerator} = require('../helpers/jwtGenerator')

const postAuth = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      res.status(400).json({
        msj: "contraseña incorrecta",
      });
    }

    const token = await jwtGenerator(user.id)

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "algo salio mal",
    });
  }
};

module.exports = {
  postAuth,
};
