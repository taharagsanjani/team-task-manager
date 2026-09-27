import { Router } from "express";
import { validateProject } from "../validators/project.js";
import { ProjectModel } from "../models/project.model.js";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const projects = await ProjectModel.find();

    res.status(200).json({ data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "خواندن پروژه‌ها انجام نشد.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isObjectIdOrHexString(id)) {
      res.status(400).json({
        message: "شناسه پروژه نامعتبر است.",
      });
      return;
    }

    const project = await ProjectModel.findById(id);

    if (project === null) {
      res.status(404).json({
        message: "پروژه پیدا نشد.",
      });
      return;
    }

    res.status(200).json({
      message: "پروژه پیدا شد.",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "خواندن پروژه انجام نشد.",
    });
  }
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

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isObjectIdOrHexString(id)) {
      res.status(400).json({
        message: "شناسه پروژه نامعتبر است.",
      });
      return;
    }

    const result = validateProject(req.body);

    if (result.success === false) {
      res.status(400).json({
        message: result.error,
      });
      return;
    }

    const project = await ProjectModel.findById(id);

    if (project === null) {
      res.status(404).json({
        message: "پروژه پیدا نشد.",
      });
      return;
    }

    project.name = result.data.name;
    project.description = result.data.description;
    await project.save();

    res.status(200).json({
      message: "پروژه ویرایش شد.",
      data: project,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "ویرایش پروژه انجام نشد.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isObjectIdOrHexString(id)) {
      res.status(400).json({
        message: "شناسه پروژه نامعتبر است.",
      });
      return;
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(id);

    if (deletedProject === null) {
      res.status(404).json({
        message: "پروژه پیدا نشد.",
      });
      return;
    }

    res.status(200).json({
      message: "پروژه حذف شد.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "حذف پروژه انجام نشد.",
    });
  }
});

export default router;
