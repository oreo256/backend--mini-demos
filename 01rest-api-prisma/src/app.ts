import express from "express";
import postRoutes from "./routes/postRoutes";

const app = express();
app.use(express.json());
app.use("/api/posts", postRoutes);

app.get('/',(req,res) => {
  res.send("Hello Prisma API!!")
});

const PORT = 3000;
app.listen(PORT,() => {
  console.log(`Server runnning on http://localhost:${PORT}`);
})