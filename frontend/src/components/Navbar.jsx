import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8000/api/user-profile/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setRole(data.role))
      .catch(() => setRole(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
      backgroundColor: "#333",
      color: "#fff"
    }}>
      <h3>TransportApp</h3>
      <div style={{ display: "flex", gap: "1rem" }}>
        {!role && <Link to="/auth" style={{ color: "white" }}>Login</Link>}

        {role === "dispecer" && (
          <>
            <Link to="/offers" style={{ color: "white" }}>Oferte</Link>
            <Link to="/offers/export" style={{ color: "white" }}>Export</Link>
            <Link to="/profile" style={{ color: "white" }}>Profil</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/admin/dispeceri" style={{ color: "white" }}>Admin Panel</Link>
            <Link to="/profile" style={{ color: "white" }}>Profil</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
