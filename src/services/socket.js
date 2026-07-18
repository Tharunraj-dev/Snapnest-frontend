import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SERVER_URL}/chats`,{
    withCredentials:true,
});

window.socket = socket;
window.serverURL = import.meta.env.VITE_SERVER_URL;

export default socket;
