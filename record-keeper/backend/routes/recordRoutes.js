import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";

const router = express.Router();

// ✅ Routes
router.post("/", createRecord); // Create new record
router.get("/", getRecords); // Fetch all records
router.put("/:id", updateRecord); // Update record by ID
router.delete("/:id", deleteRecord); // Delete record by ID

export default router;
