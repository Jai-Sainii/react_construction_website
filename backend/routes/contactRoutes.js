import express from "express";
import {
  getContacts,
  addContact,
  deleteContact
} from "../controllers/contactController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getContacts);     
router.post("/", addContact);              
router.delete("/:id", deleteContact);

export default router;
