import express from "express";
import { uploadFile, getFile, getUserFiles, deleteFile } from "../controllers/fileController.js";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("file"), uploadFile);
router.get("/my-history", protect, getUserFiles);
router.delete("/:id", protect, deleteFile);
router.get("/:code", getFile);

export default router;