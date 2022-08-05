
const txtUid = document.getElementById("txtUid"),
    txtMensaje = document.getElementById("txtMensaje"),
    ulUsuarios = document.getElementById("ulUsuarios"),
    ulMensajes = document.getElementById("ulMensajes"),
    botonEnviar = document.getElementById("enviarMensaje"),
    mensajesPrivados = document.getElementById("mensajesPrivados");

let socket = null;

let url = window.location.hostname.includes("localhost")
    ? "http://localhost:8087/api/auth/"
    : "https://chat-bamd.herokuapp.com/api/auth/";

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
        if (!tokenDb) {
            return false;
        }
        user = userDb;
        token = tokenDb;

        localStorage.setItem("correoUsuario", user.email);
        localStorage.setItem("token", token);
        document.title = user.name;
    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
};

const crearMensajes = (mensajes = []) => {
    ulMensajes.innerHTML = "";

    let mensajesHtml = "";

    mensajes.reverse().forEach(({ nombre, mensaje }) => {
        mensajesHtml += `
        <div class="card mb-2">
            <div class="card-body">
            <p><span class="text-primary">${nombre}: </span>${mensaje}</p>
            </div>
        </div>
        `;
    });

    ulMensajes.innerHTML = mensajesHtml;
};

const conectarSocket = async () => {
    socket = io({
        extraHeaders: {
            "x-token": localStorage.getItem("token"),
        },
    });

    const crearUsuario = (usuario) => {
        const liUsuario = document.createElement("li");
        liUsuario.setAttribute("id", usuario.uid);
        liUsuario.setAttribute("usuario", "true");
        liUsuario.textContent = usuario.name;
        ulUsuarios.appendChild(liUsuario);
    };

    socket.on("connect", () => {
        console.log("sockets on");
    });
    socket.on("disconnect", () => {
        console.log("sockets off");
        ulUsuarios.innerHTML = "";
    });
    socket.on("usuarios-activos", (usuarios = []) => {
        ulUsuarios.innerHTML = "";
        usuarios.forEach((usuario) => {
            crearUsuario(usuario);
        });
    });
    socket.on("usuario-conectado", (usuario) => {
        crearUsuario(usuario);
    });

    socket.on("usuario-desconectado", (usuario) => {
        const liUsuario = document.getElementById(usuario.uid);
        if (liUsuario) {
            liUsuario.remove();
        }
    });
    socket.on("recibir-mensaje", crearMensajes);
    socket.on("mensaje-privado", ({de,mensaje}) => {
        
        mensajesPrivados.innerHTML += `
        <div class="card mb-2">
            <div class="card-body">
            <p><span class="text-warning">${de}: </span>${mensaje}</p>
            </div>
        </div>
        `

    });
};
const main = async () => {
    const tokenValido = await validarJWT(url);

    if (!tokenValido) {
        console.log(false);
        localStorage.removeItem("correoUsuario");
        localStorage.removeItem("token");
        window.location = "/";
    }
    console.log(true);

    await conectarSocket();
};

main();

const singOut = document.getElementById("sing-out");
singOut.onclick = () => {
    let correoGuardado = localStorage.getItem("correoUsuario");
    if (correoGuardado) {
        localStorage.removeItem("correoUsuario");
        localStorage.removeItem("token");
        document.location = "/";
    }
};

const enviarMensaje = () => {
    const mensaje = txtMensaje.value.trim();
    const uid = txtUid.getAttribute("toUser");
    if (mensaje.length === 0) return;
    socket.emit("enviar-mensaje", { mensaje, uid });
    txtMensaje.value = "";
};

txtMensaje.addEventListener("keyup", ({ key }) => {
    if (key !== "Enter") return;
    enviarMensaje();
});

botonEnviar.addEventListener("click", enviarMensaje);

document.addEventListener("click", (e) => {
    if (e.target.getAttribute("usuario") === "true") {
        txtUid.value = e.target.textContent;
        txtUid.setAttribute("toUser",e.target.getAttribute("id"))
    }
});

txtUid.addEventListener("click", () => {
    txtUid.value = "";
    txtUid.removeAttribute("toUser")
});
