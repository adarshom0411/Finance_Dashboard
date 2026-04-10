import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Finance() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: ""
  });
  const [error, setError] = useState("");

  const fetchRecords = async () => {
    const res = await API.get("/finance");
    setRecords(res.data.data);
  };

  const handleCreate = async () => {
    try {
      setError("");

      if (!form.amount || !form.category) {
        return setError("All fields required");
      }

      await API.post("/finance", {
        amount: Number(form.amount), 
        type: form.type,
        category: form.category,
        date: new Date().toISOString()
      });

      setForm({
        amount: "",
        type: "income",
        category: ""
      });

      fetchRecords();
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Finance</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <input
          type="number"
          placeholder="Amount"
          className="border p-2"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          placeholder="Category"
          className="border p-2"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4"
        >
          Add
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.category}</td>
              <td>₹{r.amount}</td>
              <td>{r.type}</td>
              <td>
                {new Date(r.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}