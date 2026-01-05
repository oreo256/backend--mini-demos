import type { Server as HttpServer } from "http";
import { Server } from "socket.io";

export function setupSocket(server: HttpServer){
  const io = new Server(server);

  io.on("connection",(socket) => {
    console.log(`connexted: ${socket.id}`);

    socket.on("disconnect",(reason) => {
      console.log(`disconnected: ${socket.id} (${reason})`);
    });
  });

  return io;
}