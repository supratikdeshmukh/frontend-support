const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ POST /api/users - Create a new user entry
router.post("/", async (req, res) => {
  try {
    // ✅ Destructuring request body with default values
    const {
      name = "",
      age = "",
      gender = "",
      phone = "",
      email = "",
      address = "",
    } = req.body;

    // ✅ Server-side validation: ensures no required fields are empty
    if (!name || !age || !gender || !phone || !email || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
    }

    // ✅ Phone validation: exactly 10 digits (ignores non-numeric chars)
    if (!/^[0-9]{10}$/.test(String(phone).replace(/\D/g, ""))) {
      return res
        .status(400)
        .json({ success: false, message: "Phone must be exactly 10 digits." });
    }

    // ✅ Age validation: must be between 1 and 120
    const ageNum = parseInt(age, 10);
    if (Number.isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid age between 1 and 120.",
      });
    }

    // ✅ Create new user document
    const user = new User({ name, age: ageNum, gender, phone, email, address });
    await user.save(); // ✅ Save to MongoDB

    // ✅ Success response
    return res.json({ success: true, message: "✅ Data saved successfully!" });
  } catch (err) {
    console.error(err);
    // ❌ Improvement: Avoid exposing server details in error messages
    return res.status(500).json({
      success: false,
      message: "❌ Server error. Please try again later.",
    });
  }
});

module.exports = router;
