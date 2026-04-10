import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

const Records = () => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchRecords();
  }, [filter]);

  const fetchRecords = async () => {
    try {
      let url = "/records";

      if (filter) {
        url += `?type=${filter}`;
      }

      const res = await api.get(url);
      setRecords(res.data.data.records);
    } catch (err) {
      console.error("Fetch error:", err.response?.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("Deleting ID:", id);

      await api.delete(`/records/${id}`);

      fetchRecords(); // refresh
    } catch (err) {
      console.error("Delete error:", err.response?.data);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Records</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
              <th className="p-2">Category</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="text-center border-t">
                <td className="p-2">₹{r.amount}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2">{r.category}</td>

                <td className="p-2">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <p className="mt-4 text-gray-500">No records found</p>
        )}
      </div>
    </div>
  );
};

export default Records;