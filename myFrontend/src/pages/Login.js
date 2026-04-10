import { useState } from "react";
import API from "../api/axios";

export default function Login({ setLoggedIn }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.data.token);
      setLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Finance Dashboard
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

      </div>
    </div>
  );
}