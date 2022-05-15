const jwt = require("jsonwebtoken");

const jwtGenerator = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.PRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("no se genero el JWT");
        } else {
          resolve(token);
        }
      }
    );
    
  });
};

module.exports = { jwtGenerator };
