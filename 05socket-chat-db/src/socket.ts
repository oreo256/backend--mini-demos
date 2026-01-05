import type { Server as HttpServer } from "http";
import { Server } from "socket.io";

type ChatPayload ={
  id: string;
  text: string;
  at: number;
}

export function setupSocket(server: HttpServer){
  const io = new Server(server);

  io.on("connection",(socket) => {
    console.log(`connected: ${socket.id}`);

    socket.on("chat message",(msg: string) => {
      const text = (msg ?? "").trim();
      if(!text) return;

      const payload:ChatPayload = {
        id: socket.id,
        text,
        at: Date.now()
      };

      io.emit("chat message",payload);
    })

    socket.on("disconnect",(reason) => {
      console.log(`disconnected: ${socket.id} (${reason})`);
    })
  })
  
  return io;
}

