import { useEffect, useState } from "react";
import axios from "axios";

export default function RecordForm({
  onRecordAdded,
  onRecordUpdated,
  editingRecord,
  setEditingRecord,
}) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    bestPlace: "",
  });

  // ✅ Use env variable for API base URL
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fill form when editing
  useEffect(() => {
    if (editingRecord) {
      setForm({
        name: editingRecord.name,
        age: editingRecord.age,
        gender: editingRecord.gender,
        bestPlace: editingRecord.bestPlace,
      });
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        // ✅ Update existing record
        const res = await axios.put(
          `${API_URL}/records/${editingRecord._id}`,
          form
        );
        onRecordUpdated(res.data);
      } else {
        // ✅ Create new record
        const res = await axios.post(`${API_URL}/records`, form);
        onRecordAdded(res.data);
      }

      // ✅ Reset form after submit
      setForm({ name: "", age: "", gender: "", bestPlace: "" });
      setEditingRecord(null); // ✅ exit edit mode after submit
    } catch (err) {
      console.error("Error saving record:", err);
      alert("Error saving record");
    }
  };

  // ✅ Cancel editing → reset form & exit edit mode
  const handleCancel = () => {
    setForm({ name: "", age: "", gender: "", bestPlace: "" });
    setEditingRecord(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white"
        required
      />
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white"
        required
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input
        type="text"
        name="bestPlace"
        placeholder="Best Place"
        value={form.bestPlace}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800 text-white"
        required
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
        >
          {editingRecord ? "Update" : "Submit"}
        </button>

        {/* ✅ Show Cancel button only in Edit mode */}
        {editingRecord && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600 py-2 rounded text-white font-semibold"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
