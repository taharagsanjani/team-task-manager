import mongoose from "mongoose";
import { ProjectModel } from "./project.model.js";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["todo", "in_progress", "done"],
    default: "todo",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ProjectModel.modelName,
    required: true,
  },
});

export const TaskModel = mongoose.model("Task", taskSchema);
