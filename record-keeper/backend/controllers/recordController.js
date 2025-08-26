import Record from "../models/Record.js";

// ✅ Create a record
export const createRecord = async (req, res) => {
  try {
    const { name, age, gender, bestPlace } = req.body;
    const record = await Record.create({ name, age, gender, bestPlace });
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get all records
export const getRecords = async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a record by ID
export const updateRecord = async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete a record by ID
export const deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
