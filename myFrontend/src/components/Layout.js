export default function Layout({ children, setPage, onLogout }) {
  return (
    <div className="flex h-screen bg-gray-100">
    
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold mb-8">Finance SaaS</h2>

          <div className="space-y-4">
            <button
              onClick={() => setPage("dashboard")}
              className="block w-full text-left hover:text-blue-400"
            >
              Dashboard
            </button>

            <button
              onClick={() => setPage("finance")}
              className="block w-full text-left hover:text-blue-400"
            >
              Finance
            </button>

            <button
              onClick={() => setPage("users")}
              className="block w-full text-left hover:text-blue-400"
            >
              Users
            </button>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded mt-6"
        >
          Logout
        </button>

      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}