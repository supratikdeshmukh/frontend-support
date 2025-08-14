const mongoose = require("mongoose");

// ✅ Define the User schema
const userSchema = new mongoose.Schema({
  // ✅ Name: required, trims extra spaces
  name: { type: String, required: true, trim: true },

  // ✅ Age: required, with min/max validation
  age: { type: Number, required: true, min: 1, max: 150 },

  // ✅ Gender: required, limited to specific values
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },

  // ✅ Phone: required (validation done in route)
  phone: { type: String, required: true },

  // ✅ Email: required, lowercase & trimmed
  email: { type: String, required: true, lowercase: true, trim: true },

  // ✅ Address: required
  address: { type: String, required: true },

  // ✅ Timestamp for creation
  created_at: { type: Date, default: Date.now },
});

// ✅ Export the User model
module.exports = mongoose.model("User", userSchema);
