const { Users, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;
const coleccionesPermitidas = ["user", "categoria", "producto", "productoByCategoria"];

const buscarUsers = async (termino = "", res) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const user = await Users.findById(termino);
    return res.json({ results: user ? [user] : [] });
  }
  const regex = new RegExp(termino, "i");

  const users = await Users.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ estado: true }],
  });

  return res.json({ results: users });
};

const buscarCategorias = async (termino = "", res) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({ results: categoria ? [categoria] : [] });
  }
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex, estado: true });

  return res.json({ results: categorias });
};

const buscarProductos = async (termino = "", res) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const producto = await Producto.findById(termino);
    return res.json({ results: producto ? [producto] : [] });
  }
  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({ nombre: regex, estado: true })
    .populate("categoria", "nombre")
    .populate("user", "name");

  return res.json({ results: productos });
};

const buscarProductosByCategoria = async (termino = "", res) => {
    const esMongoId = ObjectId.isValid(termino);
  
    if (esMongoId) {
      const producto = await Producto.findOne({categoria: ObjectId(termino)})
      return res.json({ results: producto ? [producto] : [] });
    }
    const regex = new RegExp(termino, "i");
  
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    const categoriasEncontradas = categorias.map((categoria) => {
        return {
            categoria: categoria._id
        }
    })

    const productos = await Producto.find({
        $or: categoriasEncontradas,
        $and: [{ estado: true }],
      }).populate("categoria", "nombre");
      
      return res.json({results: productos})
  };

const buscar = (req, res) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res
      .status(400)
      .json({ msg: `las colecciones permitidas son ${coleccionesPermitidas}` });
  }

  switch (coleccion) {
    case "user":
      buscarUsers(termino, res);
      break;
    case "categoria":
      buscarCategorias(termino, res);
      break;
    case "producto":
      buscarProductos(termino, res);
      break;
      case "productoByCategoria":
      buscarProductosByCategoria(termino,res)
      break;

    default:
      return res.status(500).json({ msg: "busqueda no implementada" });
  }
};

module.exports = { buscar };
