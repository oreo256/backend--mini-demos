import express from "express";
import { Request,Response } from "express";
import authRoutes from "./routes/authRoutes"
import protectedRoutes from "./routes/protectedRoutes";

const app = express();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api", protectedRoutes);

app.get("/",(req:Request, res:Response) => {
  res.send("Hello");
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server runnning on http://localhost:${PORT}`);
})