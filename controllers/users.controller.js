const getUsers = (req, res) => {

  const {s, nombre, pag = '1', limit = '10'} = req.query

  res.json({
    ok: true,
    msg: "get api controller",
    s,
    nombre,
    pag,
    limit
  });
};

const putUsers = (req, res) => {

  const {id} = req.params;
  res.json({
    ok: true,
    msg: "put api controller",
    id
  });
};

const postUsers = (req, res) => {
  const {nombre, edad} = req.body;

  res.json({
    ok: true,
    msg: "post api controller",
    nombre,
    edad
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
