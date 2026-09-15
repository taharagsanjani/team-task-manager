import "dotenv/config";
import express from "express";
import { ok } from "node:assert";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "server is running",
  });
console.log("Incoming request:", req.method, req.path);});

app.get("/api/info", (req, res) => {
  res.status(200).json({
    status: "team task manager",
    message: "0.1.0",
  });
console.log("Incoming request:", req.method, req.path);});

app.listen(port, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${port} 👽🛸🛰️`);
});
