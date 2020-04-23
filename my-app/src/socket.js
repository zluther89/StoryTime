import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:1337";

// export const socket = io(ENDPOINT); //dev only

export const socket = io();
