const dbValidators = require("./db-validators");
const googleVerify = require("./google-verify");
const jwtGenerator = require("./jwtGenerator");
const subirArchivo = require("./subir-archivo");

module.exports = {
  ...dbValidators,
  ...googleVerify,
  ...jwtGenerator,
  ...subirArchivo,
};
