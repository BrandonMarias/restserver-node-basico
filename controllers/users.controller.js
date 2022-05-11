const bcryptjs = require('bcryptjs')
const User = require("../models/user");
const {validationResult} = require('express-validator')

const getUsers = (req, res) => {
  const { s, nombre, pag = "1", limit = "10" } = req.query;

  res.json({
    ok: true,
    msg: "get api controller",
    s,
    nombre,
    pag,
    limit,
  });
};

const putUsers = (req, res) => {
  const { id } = req.params;
  res.json({
    ok: true,
    msg: "put api controller",
    id,
  });
};

const postUsers = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }


  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  //verificar que el correo existe

  const emailExist = await User.findOne({email})

  if (emailExist) {
    return res.status(400).json({
      msg: 'el correo ya existe'
    })
  }

  // encriptar la contraseña 

  const slat = bcryptjs.genSaltSync()

  user.password = bcryptjs.hashSync(password, slat)


  //guardar en db


  await user.save();

  res.json({
    ok: true,
    msg: "post api controller",
    name,
  });
};

const patchUsers = (req, res) => {
  res.json({
    ok: true,
    msg: "patch api controller",
  });
};

const deleteUsers = (req, res) => {
  res.json({
    ok: true,
    msg: "delete api controller",
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
