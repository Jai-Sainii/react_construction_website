import express from "express";
import {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getTeamMembers);         
router.post("/", addTeamMember);         
router.put("/:id", updateTeamMember);    
router.delete("/:id", deleteTeamMember); 

export default router;
