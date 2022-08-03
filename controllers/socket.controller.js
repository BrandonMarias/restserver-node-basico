const { Socket } = require("socket.io");
const { comprobarJwt } = require("../helpers");
const { Chat } = require("../models");

const chat = new Chat();

const socketController = async (socket = new Socket(), io) => {
    const token = socket.handshake.headers["x-token"];
    const user = await comprobarJwt(token);
    if (!user) {
        return socket.disconnect();
    }

    socket.join(user.id);
    socket.emit("usuarios-activos", chat.usuariosArr);
    socket.emit("recibir-mensaje", chat.ultimos10);

    chat.conectarUsuario(user);

    socket.broadcast.emit("usuario-conectado", user);

    socket.on("disconnect", () => {
        socket.broadcast.emit("usuario-desconectado", user);
        chat.eliminarUsuario(user);
    });

    socket.on("enviar-mensaje", ({ mensaje, uid }) => {
        if (uid) {
            socket.to(uid).emit("mensaje-privado",{de: user.name, mensaje})
        } else {
            chat.enviarMensaje(user.id, user.name, mensaje);
            io.emit("recibir-mensaje", chat.ultimos10);
        }
    });
};

module.exports = socketController;
