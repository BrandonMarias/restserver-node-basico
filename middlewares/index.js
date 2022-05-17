const reqValidations = require("./reqValidations");
const jwtValidation = require("./jwtValidation");
const roleValidator = require("./roleValidator");

module.exports = {
  ...reqValidations,
  ...jwtValidation,
  ...roleValidator,
};
