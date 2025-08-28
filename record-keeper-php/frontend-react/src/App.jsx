import { useEffect, useState } from "react";
import axios from "axios";
import RecordForm from "./components/RecordForm.jsx";
import RecordTable from "./components/RecordTable.jsx";

export default function App() {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  // ✅ Use environment variable for API base URL
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Fetch records when component mounts
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${API_URL}/records.php`);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  // ✅ Add new record to state (prepend to list)
  const handleNewRecord = (record) => {
    setRecords((prev) => [record, ...prev]);
  };

  // ✅ Update existing record in state and reset editing
  const handleUpdateRecord = (updated) => {
    setRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditingRecord(null);
  };

  // ✅ Remove record from state by id
  const handleDeleteRecord = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eb0066] via-[#ff00aa] to-[#1492ff] text-white flex flex-col items-center pt-12 pb-6 px-2">
      {/* ✅ Main Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 mb-10 text-center">
        Record Keeper | React + PHP + MySQL
      </h1>

      {/* ✅ Responsive grid: Form on left, Table on right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* ✅ Form container */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-[#eb0066] text-center">
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

        {/* ✅ Table container */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-[#1492ff] text-center">
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
