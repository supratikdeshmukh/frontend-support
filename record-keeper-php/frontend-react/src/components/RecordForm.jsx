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

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Populate form when editingRecord changes (for edit mode)
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

  // ✅ Update form state on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit form to create or update record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingRecord) {
        res = await axios.post(`${API_URL}/records.php`, {
          action: "update",
          id: editingRecord.id,
          ...form,
        });
        onRecordUpdated(res.data);
      } else {
        res = await axios.post(`${API_URL}/records.php`, {
          action: "create",
          ...form,
        });
        onRecordAdded(res.data);
      }

      // ✅ Reset form and exit editing mode
      setForm({ name: "", age: "", gender: "", bestPlace: "" });
      setEditingRecord(null);
    } catch (err) {
      console.error("Error saving record:", err);
      alert("Error saving record");
    }
  };

  // ✅ Cancel editing, reset form and editing state
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
        className="w-full p-2 rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-pink-500"
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-pink-500"
        required
      />
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full p-2 rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-pink-500"
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
        className="w-full p-2 rounded border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-pink-500"
        required
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-pink-500 hover:bg-pink-600 py-2 rounded text-white font-semibold transition-colors"
        >
          {editingRecord ? "Update" : "Submit"}
        </button>

        {editingRecord && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 py-2 rounded text-gray-800 font-semibold transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
