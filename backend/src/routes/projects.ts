import { Router } from "express";
import { projects } from "../data/projects.js";
import { validateProject } from "../validators/project.js";
import { randomUUID } from "node:crypto";


const router = Router();


router.get("/", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  res.status(200).json({ data: projects });
});

router.get("/:id", (req, res) => {
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

// ido : its for ///creating a project sing post 

router.post("/", (req, res) => {
  console.log("Incoming request:", req.method, req.path);
  console.log("body:", req.body);
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

// ido : its for ///edit the project

router.put("/:id", (req, res) => {
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

// ido : its for ///remove the project 

router.delete("/:id", (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  const id = req.params.id;
  const projectIndex = projects.findIndex((item) => item.id === id);

  if (projectIndex === -1) {
    res.status(404).json({
      message: "پروژه پیدا نشد.",
    });
    return;
  }

  projects.splice(projectIndex, 1);

  res.status(200).json({
    message: "پروژه حذف شد.",
  });
});

export default router
