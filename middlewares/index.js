const reqValidations = require("./reqValidations");
const jwtValidation = require("./jwtValidation");
const roleValidator = require("./roleValidator");
const archivoValidator = require("./validarSubirArchivo");

module.exports = {
  ...reqValidations,
  ...jwtValidation,
  ...roleValidator,
  ...archivoValidator,
};
