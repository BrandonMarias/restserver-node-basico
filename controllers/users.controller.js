const bcryptjs = require("bcryptjs");
const { findByIdAndUpdate } = require("../models/user");
const User = require("../models/user");

const getUsers = async (req, res) => {
  const { limit = "2", from = "0" } = req.query;
  const userActive = { estado: true };

  const [total, users] = await Promise.all([
    User.countDocuments(userActive),
    User.find(userActive).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ total, users });
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const slat = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, slat);
  }

  const userUpdated = await User.findByIdAndUpdate(id, rest);

  res.json(userUpdated);
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

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { estado: false });
  const autenticatedUser = req.user;

  res.json({ user, autenticatedUser});
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
};
