import express from "express";
import { getServices, addService, deleteService } from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", addService);
router.delete("/:id", deleteService);

export default router;
