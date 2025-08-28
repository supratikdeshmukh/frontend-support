import axios from "axios";

export default function RecordTable({ records, onEdit, onDelete }) {
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Confirm and delete record, then update parent state
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.post(`${API_URL}/records.php`, {
        action: "delete",
        id,
      });
      onDelete(id);
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Error deleting record");
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto border border-blue-400 shadow-lg scrollbar-thin bg-gradient-to-br from-[#1492ff]/20 via-[#1492ff]/10 to-white p-4">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#1492ff] text-white sticky top-0 rounded-t-lg">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Age</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Best Place</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No records yet
              </td>
            </tr>
          ) : (
            records.map((r, idx) => (
              <tr key={r.id} className="odd:bg-white even:bg-[#e0f0ff]">
                <td className="p-2 text-gray-800">{idx + 1}</td>
                <td className="p-2 text-gray-800">{r.name}</td>
                <td className="p-2 text-gray-800">{r.age}</td>
                <td className="p-2 text-gray-800">{r.gender}</td>
                <td className="p-2 text-gray-800">{r.bestPlace}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    {/* ✅ Trigger edit mode */}
                    <button
                      onClick={() => onEdit(r)}
                      className="px-3 py-1 text-xs bg-[#eb0066] hover:bg-[#ff00aa] text-white rounded font-semibold"
                    >
                      Edit
                    </button>
                    {/* ✅ Delete record with confirmation */}
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="px-3 py-1 text-xs bg-[#1492ff] hover:bg-[#1fa2ff] text-white rounded font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
