import express from "express";
import { validateProject } from "./validators/project.js";
import { projects } from "./data/projects.js";
import { randomUUID } from "node:crypto";
const app = express();

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

app.post("/api/projects", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  const result = validateProject(req.body);

  if (result.success === false) {
    res.status(400).json({
      message: result.error,
    });
    return;
  }
  const newProject = {
    id: randomUUID(),
    name: result.data.name,
    description: result.data.description,
  };

  projects.push(newProject);

  res.status(201).json({
    message: "اطلاعات پروژه معتبر است.",
    data: result.data,
  });
});

app.get("/api/projects", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  res.status(200).json({ data: projects });
});

app.get("/api/projects/:id", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  const id = req.params.id;

  const project = projects.find((item) => item.id === id);

  if (project === undefined) {
    res.status(404).json({
      message: "پروژه پیدا نشد.",
    });
    return;
  }

  res.status(200).json({
    message: "پروژه پیدا شد.",
    data: project,
  });
});

app.put("/api/projects/:id", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  const result = validateProject(req.body);
  const id = req.params.id;
  const project = projects.find((item) => item.id === id);

  if (project === undefined) {
    res.status(404).json({
      message: "پروژه پیدا نشد.",
    });
    return;
  }

  if (result.success === false) {
    res.status(400).json({
      message: result.error,
    });
    return;
  }

  project.name = result.data.name;
  project.description = result.data.description;

  res.status(200).json({
    message: "پروژه ادیت شد.",
    data: project,
  });
});

app.delete("/api/projects/:id", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  const id = req.params.id;
  const projectIndex = projects.findIndex((item) => item.id === id);

  if (projectIndex === -1) {
    res.status(404).json({
      message: "پروژه پیدا نشد.",
    });
    return;
  }

  projects.splice(projectIndex,1)

  res.status(200).json({
    message: "پروژه حذف شد.",
  });
});

export default app;
