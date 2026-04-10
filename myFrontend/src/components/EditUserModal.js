import { useState } from "react";
import API from "../api/axios";

export default function EditUserModal({ user, onClose, onSave }) {
  const [role, setRole] = useState(user.role);

  const update = async () => {
    await API.put(`/users/${user._id}`, { role });
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-lg font-bold mb-4">Edit Role</h2>

        <select
          className="border p-2 w-full mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="analyst">Analyst</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button onClick={update} className="bg-blue-500 text-white px-3 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}