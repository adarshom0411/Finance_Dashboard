import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Records", path: "/records" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">💰 Dashboard</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            className="mb-4 p-2 rounded cursor-pointer hover:bg-gray-700 transition"
          >
            {item.name}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          removeToken();
          navigate("/");
        }}
        className="mt-10 bg-red-500 px-3 py-2 rounded w-full hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;