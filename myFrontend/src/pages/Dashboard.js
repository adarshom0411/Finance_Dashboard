import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/dashboard/summary");
      setData(res.data.data);
    };
    fetch();
  }, []);

  const Card = ({ title, value, color }) => (
    <div className={`p-6 rounded-2xl shadow-md text-white ${color}`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-2xl font-bold mt-2">₹{value || 0}</p>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Total Income" value={data.totalIncome} color="bg-green-500" />
        <Card title="Total Expense" value={data.totalExpense} color="bg-red-500" />
        <Card title="Net Balance" value={data.netBalance} color="bg-blue-500" />
      </div>
    </div>
  );
}