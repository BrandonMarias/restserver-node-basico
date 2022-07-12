const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (archivo, extenciones = [], carpeta = "user") => {
  return new Promise((resolve, reject) => {
    if (!extenciones.includes(archivo.mimetype)) {
      return reject({ msg: `extenciones validas ${extenciones}`, status: 400 });
    }

    const [, extencion] = archivo.mimetype.split("/");

    const nombreTemp = uuidv4() + "." + extencion;

    const uploadPath = path.join(
      __dirname + `/../uploads/${carpeta}/` + nombreTemp
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return reject({ status: 500, msg: err });
      }
      return resolve({
        msg: `el archivo se subio a ${uploadPath}`,
        nombre: nombreTemp,
      });
    });
  });
};

module.exports = { subirArchivo };
