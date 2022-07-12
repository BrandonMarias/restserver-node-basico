const { subirArchivo } = require("../helpers");
const { Users, Producto } = require("../models");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const cargarArchivo = async (req, res) => {
  try {
    const msg = await subirArchivo(req.files.archivo, [
      "image/png",
      "image/jpeg",
    ]);

    res.json(msg);
  } catch ({ msg, status }) {
    res.status(status).json({ msg });
  }
};

////////////////////////////////////////////////////////
const actualizarImg = async (req, res) => {
  if (!req.files || !req.files.archivo) {
    return res.status(400).json({ msg: "archivo no cargado" });
  }
  const {archivo} = req.files;
  if (!["image/png","image/jpeg",].includes(archivo.mimetype)) {
    return res.status(400).json({ msg: "extencion no valida"});
  }
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "user":
      modelo = await Users.findById(id);
      if (!modelo) {
        return res.status(500).json({ msg: "no se encontro el usuario" });
      }
      break;
    case "producto":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(500).json({ msg: "no se encontro el producto" });
      }
      break;

    default:
      return res.status(500).json({ msg: "error al validar modelo" });
  }

  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const [nombre] = nombreArr[nombreArr.length - 1].split(".");
    cloudinary.uploader.destroy(nombre);
  }

  try {
    // const { nombre } = await subirArchivo(
    //   req.files.archivo,
    //   ["image/png", "image/jpeg"],
    //   coleccion
    // );
    // const actualizado = await modelo.findByIdAndUpdate(
    //   id,
    //   { img: nombre },
    //   { new: true }
    // );

    // return res.json({
    //   coleccion,
    //   id,
    //   owner: req.owner,
    //   role: req.roleConfirmation,
    //   actualizado,
    // });
    const { tempFilePath } = archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();

    return res.json(modelo);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const mostrarImg = async (req, res) => {
  const { coleccion, id } = req.params;
  let modelo;

  switch (coleccion) {
    case "user":
      modelo = await Users.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: "no se encontro el usuario" });
      }
      break;
    case "producto":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({ msg: "no se encontro el producto" });
      }
      break;

    default:
      return res.status(400).json({ msg: "error al validar modelo" });
  }

  if (!modelo.img) {
    const pathImg = path.join(__dirname, "../assets/no-image.jpg");
    if (fs.existsSync(pathImg)) {
      console.log(pathImg);
      return res.sendFile(pathImg);
    }
  }

  try {
    const pathImg = path.join(__dirname, "../uploads", coleccion, modelo.img);
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { cargarArchivo, actualizarImg, mostrarImg };
