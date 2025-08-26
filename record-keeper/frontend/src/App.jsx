import { useEffect, useState } from "react";
import axios from "axios";
import RecordForm from "./components/RecordForm.jsx";
import RecordTable from "./components/RecordTable.jsx";

export default function App() {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  // ✅ Use env variable instead of hardcoded URL
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch records on load
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${API_URL}/records`);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  // ✅ Add new record
  const handleNewRecord = (record) => {
    setRecords((prev) => [record, ...prev]);
  };

  // ✅ Update record in state
  const handleUpdateRecord = (updated) => {
    setRecords((prev) =>
      prev.map((r) => (r._id === updated._id ? updated : r))
    );
    setEditingRecord(null);
  };

  // ✅ Delete record in state
  const handleDeleteRecord = (id) => {
    setRecords((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-blue-900 text-white flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* ✅ Left: Form */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {editingRecord ? "Edit Record" : "Add Record"}
          </h2>
          <RecordForm
            onRecordAdded={handleNewRecord}
            onRecordUpdated={handleUpdateRecord}
            editingRecord={editingRecord}
            setEditingRecord={setEditingRecord}
          />
        </div>

        {/* ✅ Right: Table */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Saved Records</h2>
          <RecordTable
            records={records}
            onEdit={setEditingRecord}
            onDelete={handleDeleteRecord}
          />
        </div>
      </div>
    </div>
  );
}
