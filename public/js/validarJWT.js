const validarJWT = async (url) => {
    let user = null;
    let token = null;

    token = localStorage.getItem("token");

    if (!token) {
        console.log("no hay token");
        return false;
    }

    try {
        const respuesta = await fetch(url, {
            headers: { "x-token": token },
        });
        const { user: userDb, token: tokenDb } = await respuesta.json();

        user = userDb;
        token = tokenDb;

        localStorage.setItem("correoUsuario", user.email);
        localStorage.setItem("token", token);
    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
};

module.exports = {validarJWT}