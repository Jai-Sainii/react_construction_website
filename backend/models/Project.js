import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Ongoing", "Completed"], 
    default: "Ongoing" 
  },
  images: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
