const bcryptjs = require("bcryptjs");
const User = require("../models/user");

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

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { password, google, email, ...rest } = req.body;

  if (password) {
    const slat = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, slat);
  }

  const userUpdated = await User.findByIdAndUpdate(id, rest)

  res.json({
    ok: true,
    msg: "put api controller",
    id,
    userUpdated
  });
};

const postUsers = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // encriptar la contraseña

  const slat = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, slat);

  //guardar en db
  await user.save();

  res.json({
    ok: true,
    msg: "post api controller",
    user,
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
