const { Categoria } = require("../models");
const { findByIdAndUpdate } = require("../models/categoria");

const crearCategoria = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoria = new Categoria({
    nombre,
    user: req.user._id,
  });

  await categoria.save();

  return res.json(categoria);
};

const listarCategorias = async (req, res) => {
  const categoriaActiva = { estado: true };
  const { limit = "10", from = "0" } = req.query;

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(categoriaActiva),
    Categoria.find(categoriaActiva)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user"),
  ]);

  return res.json({ total, categorias });
};

const buscarCategoriaById = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findOne({ _id: id, estado: true });

  if (!categoria) {
    return res.status(400).json({
      msg: "categoria no encontrada",
    });
  }

  return res.json({ categoria });
};

const actualizarCategotia = async (req, res) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  const categoria = await Categoria.findOneAndUpdate(
    { _id: id, estado: true },
    { nombre }
  );

  if (!categoria) {
    return res.status(400).json({
      msg: "categoria no encontrada",
    });
  }

  return res.json({ categoria });
};

const eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

  if (!categoria) {
    return res.status(400).json({
      msg: "categoria no encontrada",
    });
  }

  return res.json({ categoria });
};

module.exports = {
  crearCategoria,
  listarCategorias,
  buscarCategoriaById,
  actualizarCategotia,
  eliminarCategoria,
};
