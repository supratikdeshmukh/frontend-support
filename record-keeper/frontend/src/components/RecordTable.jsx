import axios from "axios";

export default function RecordTable({ records, onEdit, onDelete }) {
  // ✅ Use env variable for API base URL
  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ Delete record function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      // ✅ Dynamic API URL instead of hardcoded localhost
      await axios.delete(`${API_URL}/records/${id}`);
      onDelete(id);
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Error deleting record");
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto border border-gray-700 rounded-lg scrollbar-thin">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-900 text-gray-300 sticky top-0">
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
              <td colSpan="6" className="p-4 text-center text-gray-400">
                No records yet
              </td>
            </tr>
          ) : (
            records.map((r, idx) => (
              <tr key={r._id} className="odd:bg-gray-800 even:bg-gray-700">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.age}</td>
                <td className="p-2">{r.gender}</td>
                <td className="p-2">{r.bestPlace}</td>
                <td className="p-2">
                  <div className="flex gap-1">
                    {/* ✅ Edit Button */}
                    <button
                      onClick={() => onEdit(r)}
                      className="px-2 py-1 text-xs bg-yellow-400 hover:bg-yellow-500 rounded font-semibold"
                    >
                      Edit
                    </button>

                    {/* ✅ Delete Button */}
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 rounded font-semibold text-white"
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
