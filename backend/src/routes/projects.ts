import { Router } from "express";
import { validateProject } from "../validators/project.js";
import { validateTask, validateTaskStatus } from "../validators/task.js";
import { ProjectModel } from "../models/project.model.js";
import mongoose from "mongoose";
import { TaskModel } from "../models/task.model.js";

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

    const project = await ProjectModel.findById(id);

    if (project === null) {
      res.status(404).json({
        message: "پروژه پیدا نشد.",
      });
      return;
    }

    const removeProjectsTask = await TaskModel.deleteMany({
      project: id,
    });

    const taskCounts = removeProjectsTask.deletedCount;

    await ProjectModel.findByIdAndDelete(id);

    res.status(200).json({
      message: `" تسک با ان پاک شد${taskCounts} پروژه حذف شد"`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "حذف پروژه انجام نشد.",
    });
  }
});

router.post("/:id/tasks", async (req, res) => {
  console.log("Incoming request:", req.method, req.path);

  try {
    const id = req.params.id;
    if (!mongoose.isObjectIdOrHexString(id)) {
      res.status(400).json({
        message: "شناسه پروژه نامعتبر است.",
      });
      return;
    }
    const result = validateTask(req.body);

    if (result.success === false) {
      res.status(400).json({
        message: result.error,
      });
      return;
    }

    const project = await ProjectModel.findById(id);

    if (project === null) {
      res.status(404).json({
        message: "تسک پیدا نشد.",
      });
      return;
    }

    const newTask = {
      title: result.data.title,
      description: result.data.description,
      status: result.data.status,
      project: project._id,
    };

    const taskNew = await TaskModel.create(newTask);
    res.status(201).json({
      message: "تسک ساخته شد.",
      data: taskNew,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "تسک انجام نشد.",
    });
  }
});

router.get("/:id/tasks", async (req, res) => {
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
        message: "پروزه پیدا نشد.",
      });
      return;
    }

    const tasks = await TaskModel.find({ project: id });

    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "گرفتن تسک انجام نشد.»",
    });
  }
});

router.put("/:id/tasks/:taskId", async (req, res) => {
  try {
    const id = req.params.id;
    const taskId = req.params.taskId;

    if (!mongoose.isObjectIdOrHexString(id)) {
      res.status(400).json({
        message: "شناسه پروژه نامعتبر است.",
      });
      return;
    }
    if (!mongoose.isObjectIdOrHexString(taskId)) {
      res.status(400).json({
        message: "شناسه تسک نامعتبر است.",
      });
      return;
    }

    const result = validateTask(req.body);

    if (result.success === false) {
      res.status(400).json({
        message: result.error,
      });
      return;
    }

    const task = await TaskModel.findOne({
      _id: taskId,
      project: id,
    });
    if (task === null) {
      res.status(404).json({
        message: "تسک پیدا نشد.",
      });
      return;
    }

    task.title = result.data.title;
    task.description = result.data.description;
    task.status = result.data.status;
    await task.save();

    res.status(200).json({
      message: "تسک ویرایش شد.",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "ویرایش تسک انجام نشد.",
    });
  }
});

router.delete("/:id/tasks/:taskId", async (req, res) => {
  try {
    const id = req.params.id;
    const taskId = req.params.taskId;

    if (!mongoose.isObjectIdOrHexString(id)) {
      res.status(400).json({
        message: "شناسه پروژه نامعتبر است.",
      });
      return;
    }
    if (!mongoose.isObjectIdOrHexString(taskId)) {
      res.status(400).json({
        message: "شناسه تسک نامعتبر است.",
      });
      return;
    }

    const deleteTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      project: id,
    });

    if (deleteTask === null) {
      res.status(404).json({
        message: "تسک پیدا نشد.",
      });
      return;
    }
    res.status(200).json({
      message: "تسک حذف شد.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "حذف تسک انجام نشد.",
    });
  }
});

router.patch("/:id/tasks/:taskId/status", async (req, res) => {
  try {
    const id = req.params.id;
    const taskId = req.params.taskId;

    if (!mongoose.isObjectIdOrHexString(id)) {
      res.status(400).json({
        message: "شناسه پروژه نامعتبر است.",
      });
      return;
    }
    if (!mongoose.isObjectIdOrHexString(taskId)) {
      res.status(400).json({
        message: "شناسه تسک نامعتبر است.",
      });
      return;
    }

    const result = validateTaskStatus(req.body);

    if (result.success === false) {
      res.status(400).json({
        message: result.error,
      });
      return;
    }

    const task = await TaskModel.findOne({
      _id: taskId,
      project: id,
    });
    if (task === null) {
      res.status(404).json({
        message: "تسک پیدا نشد.",
      });
      return;
    }

    task.status = result.data.status;
    await task.save();

    res.status(200).json({
      message: "وضعیت تسک ویرایش شد.",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "ویرایش تسک انجام نشد.",
    });
  }
});

export default router;
