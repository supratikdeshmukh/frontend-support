import mongoose from "mongoose";

// ✅ Define schema for Record collection
const recordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bestPlace: { type: String, required: true },
  },
  { timestamps: true } // ✅ Auto adds createdAt & updatedAt
);

// ✅ Create model
const Record = mongoose.model("Record", recordSchema);

export default Record;
