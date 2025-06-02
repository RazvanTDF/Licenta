import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // ✅ cheie corectă
    if (!token) return;

    fetch("http://localhost:8000/api/user-profile/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setRole(data.role))
      .catch(() => setRole(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // ✅ cheie corectă
    navigate("/auth");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      backgroundColor: "#26415E",
      color: "#fff"
    }}>
      <h3 style={{ margin: 0 }}>TransportApp</h3>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {!role && (
          <Link to="/auth" style={{ color: "white", textDecoration: "none" }}>Login</Link>
        )}

        {role === "dispecer" && (
          <>
            <Link to="/workspace" style={{ color: "white", textDecoration: "none" }}>Workspace</Link>
            <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profil</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/admin/dispeceri" style={{ color: "white", textDecoration: "none" }}>Admin Panel</Link>
            <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profil</Link>
          </>
        )}

        {role && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#C94F4F",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
