import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  key: { type: String, required: true }, // S3 object key
  fileSize: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  // This link connects the file to a specific user account
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
}, { timestamps: true });

export default mongoose.model("File", fileSchema);