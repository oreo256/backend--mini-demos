import express from "express";
import { Request,Response } from "express";

const app = express();
app.use(express.json());

app.get("/",(req:Request, res:Response) => {
  res.send("Hello");
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server runnning on http://localhost:${PORT}`);
})