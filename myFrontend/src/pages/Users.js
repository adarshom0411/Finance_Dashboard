import { useEffect, useState } from "react";
import API from "../api/axios";
import EditUserModal from "../components/EditUserModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    setUsers(res.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <div className="bg-white rounded-xl shadow p-4">
        {users.map((u) => (
          <div key={u._id} className="flex justify-between border-b py-2">
            <span>{u.name} ({u.role})</span>
            <button onClick={() => setSelected(u)} className="text-blue-500">
              Edit
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <EditUserModal
          user={selected}
          onClose={() => setSelected(null)}
          onSave={fetchUsers}
        />
      )}
    </div>
  );
}