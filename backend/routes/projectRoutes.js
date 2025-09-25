import express from "express";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects);           
router.post("/", protect, addProject);  
router.put("/:id", protect, updateProject);  
router.delete("/:id", protect, deleteProject); 

export default router;
