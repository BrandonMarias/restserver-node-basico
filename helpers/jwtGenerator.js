const jwt = require("jsonwebtoken");
const {Users} = require("../models")

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

const comprobarJwt = async (token = "") => {
    try {
        if (token.length < 50) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);
        const user = await Users.findById(uid);

        if (user && user.estado) {
            return user
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
};

module.exports = { jwtGenerator, comprobarJwt };
