import { Router } from "express";
import { projects } from "../data/projects.js";
import { validateProject } from "../validators/project.js";
import { ProjectModel } from "../models/project.model.js";

const router = Router();

router.get("/", async (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  const project = await ProjectModel.find();
  res.status(200).json({ data: project });
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

router.post("/", async (req, res) => {
  console.log("Incoming request:", req.method, req.path);
  console.log("body:", req.body);

  try {
    const result = validateProject(req.body);

    if (result.success === false) {
      res.status(400).json({
        message: result.error,
      });
      return;
    }
    const newProject = {
      name: result.data.name,
      description: result.data.description,
    };

    const projectNew = await ProjectModel.create(newProject);
    res.status(201).json({
      message: "پروژه ساخته شد.",
      data: projectNew,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ذخیره پروژه انجام نشد",
    });
  }
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

export default router;
