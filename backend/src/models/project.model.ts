import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export const ProjectModel = mongoose.model("Project", projectSchema);
