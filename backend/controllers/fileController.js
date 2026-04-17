import File from "../models/File.js";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3.js";

// Upload File to S3
export const uploadFile = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file provided" });

    const ext = req.file.originalname.split(".").pop();
    const key = `uploads/${uuidv4()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await s3.send(command);

    const newFile = await File.create({
      fileName: req.file.originalname,
      key,
      fileSize: req.file.size,
      code: nanoid(6),
      user: req.user?.id || null,
    });

    res.json({
      link: `${process.env.FRONTEND_URL}/file/${newFile.code}`,
      file: newFile,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};


// Generate Signed Download URL with Original Filename
export const getFile = async (req, res) => {
  try {
    const file = await File.findOne({ code: req.params.code });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Ensure filename is safely encoded
    const encodedFileName = encodeURIComponent(file.fileName);

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.key,
      ResponseContentDisposition: `attachment; filename="${encodedFileName}"`,
    });

    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 * 5, // 5 minutes
    });

    res.json({
      fileName: file.fileName,
      fileSize: file.fileSize,
      downloadUrl: signedUrl,
    });
  } catch (error) {
    console.error("Signed URL Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get User Files
export const getUserFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(files);
  } catch {
    res.status(500).json({ message: "Error fetching history" });
  }
};

// Delete File
export const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!file)
      return res.status(404).json({ message: "File not found" });

    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.key,
      })
    );

    await file.deleteOne();

    res.json({ message: "File deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};