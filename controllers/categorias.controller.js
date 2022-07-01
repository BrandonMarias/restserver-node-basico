const { Categoria } = require("../models");

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
      .populate("user", ["name", "email"]),
  ]);

  return res.json({ total, categorias });
};

const buscarCategoriaById = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("user", "name");

  return res.json({ categoria });
};

const actualizarCategotia = async (req, res) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { nombre },
    { new: true }
  );

  return res.json({ categoria });
};

const eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  return res.json({ categoria });
};

module.exports = {
  crearCategoria,
  listarCategorias,
  buscarCategoriaById,
  actualizarCategotia,
  eliminarCategoria,
};
