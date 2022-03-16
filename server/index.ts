import express, { Express } from "express";
import * as http from "http";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";

const port: number = parseInt(process.env.PORT || "3000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

let currentSong: string | undefined = undefined;

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  io.on("connection", (socket: socketio.Socket) => {
    console.log("client connected");
    if (currentSong) {
      socket.emit("next-song", currentSong);
    }

    socket.on("next-song", (songId: string | undefined) => {
      if (songId === currentSong || songId?.length !== 4) {
        return;
      }
      currentSong = songId;
      io.emit("next-song", currentSong);
    });

    socket.on("disconnect", async () => {
      console.log("client disconnected");
      const sockets = await io.allSockets();
      if (sockets.size < 1) {
        currentSong = undefined;
      }
    });
  });

  app.all("*", (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
