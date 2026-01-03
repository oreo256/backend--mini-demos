import express from "express";
import http from "http";
import path from "path";

const app = express();

app.use(express.static(path.join(process.cwd(),"public")));

const server = http.createServer(app);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

server.listen(PORT, ()=> {
  console.log(`Server runnning on http://localhost:${PORT}`);
})