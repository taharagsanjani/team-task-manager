import "dotenv/config";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get("/api/health", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});

app.get("/api/info", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  res.status(200).json({
    name: "Team Task Manager",
    version: "0.1.0",
  });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${port} 👽🛸🛰️`);
});
