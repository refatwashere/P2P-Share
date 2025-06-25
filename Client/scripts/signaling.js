// scripts/signaling.js
import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

export function initSignaling(myId, onSignal) {
    const socket = io("https://p2p-share-xw0i.onrender.com");

    socket.on("connect", () => {
        socket.emit("join", myId);
    });

    socket.on("signal", ({ from, data }) => {
        onSignal({ from, data });
    });

    return socket;
}

export function sendSignal(socket, to, data) {
    socket.emit("signal", { to, data });
}