let url = window.location.hostname.includes("localhost")
    ? "http://localhost:8087/api/auth/"
    : "https://restserver-node-bamd.herokuapp.com/api/auth/";

const validarJWT = async (url) => {
    let user = null;
    let token = null;

    token = localStorage.getItem("token");

    if (!token) {
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

const main = async () => {
    const tokenValido = await validarJWT(url);

    if (tokenValido) {
        window.location = "chat";
    } else {
        localStorage.removeItem("correoUsuario");
        localStorage.removeItem("token");
    }
};

main();

function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    // console.log(response.credential);

    const body = { id_token: response.credential };

    fetch(url + "google", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((resp) => resp.json())
        .then(({ token, user }) => {
            console.log(token);
            localStorage.setItem("correoUsuario", user.email);
            localStorage.setItem("token", token);
            window.location = "chat";
        })
        .catch(console.warn());
}

const singOut = document.getElementById("sing-out");
singOut.addEventListener("click", () => {
    let correoGuardado = localStorage.getItem("correoUsuario");
    if (correoGuardado) {
        localStorage.removeItem("correoUsuario");
        localStorage.removeItem("token");
        google.accounts.id.disableAutoSelect();
        google.accounts.id.revoke(correoGuardado, (done) => {
            location.reload();
        });
    }
});

const formulario = document.getElementById("formulario");
const correo = document.getElementById("correo");
const password = document.getElementById("contraseña");
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!password.value || !correo.value) {
        return console.log("el correo y contraseña con obligatorios ");
    }
    const body = {
        email: correo.value,
        password: password.value,
    };

    fetch(url + "login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((resp) => resp.json())
        .then(({ token, user }) => {
            if (!token) {
                throw new Error("error de autenticacion");
            }
            localStorage.setItem("correoUsuario", user.email);
            localStorage.setItem("token", token);
            console.log(token);
            window.location = "chat";
        })
        .catch((err) => {
            console.log(err);
        });
});
