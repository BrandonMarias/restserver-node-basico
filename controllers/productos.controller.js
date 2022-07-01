const { Categoria, Producto } = require("../models");

const crearProducto = async (req, res) => {
  const { estado, user, _id, ...body } = req.body;

  const data = {
    user: req.user._id,
    ...body,
  };

  data.nombre = data.nombre.toUpperCase();

  const producto = new Producto(data);

  await producto.save();

  return res.json(producto);
};

const listarProductos = async (req, res) => {
  const query = { estado: true };
  const { limit = "10", from = "0" } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("categoria", ["nombre"])
      .populate("user", "name"),
  ]);

  return res.json({ total, productos });
};

const buscarCategoriaById = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findOne({ _id: id, estado: true }).populate(
    "categoria",
    "nombre"
  );

  if (!producto) {
    return res.status(400).json({
      msg: "producto no encontrada",
    });
  }

  return res.json({ producto });
};

const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { estado, user, _id, ...body } = req.body;

  const data = {
    user: req.user._id,
    ...body,
  };

  if (data.nombre) {
      data.nombre = data.nombre.toUpperCase();
  }

  const producto = await Producto.findByIdAndUpdate(id,data, {new: true});

  return res.json(producto);
};

const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );


  return res.json({ producto });
};

module.exports = {
  crearProducto,
  listarProductos,
  buscarCategoriaById,
  actualizarProducto,
  eliminarProducto,
};
