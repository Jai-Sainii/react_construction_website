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
router.post("/", addProject);  
router.put("/:id", updateProject);  
router.delete("/:id", deleteProject); 

export default router;
