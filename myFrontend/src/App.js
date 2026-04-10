import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Users from "./pages/Users";
import Login from "./pages/Login";

function App() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  const renderPage = () => {
    if (page === "finance") return <Finance />;
    if (page === "users") return <Users />;
    return <Dashboard />;
  };

  return (
    <Layout setPage={setPage} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  );
}

export default App;