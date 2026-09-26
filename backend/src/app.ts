import express from "express";
import projectsRouter from "./routes/projects.js";

const app = express();

app.use(express.json());

app.use("/api/projects", projectsRouter);

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


export default app;
