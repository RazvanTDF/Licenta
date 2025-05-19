import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }

    fetch("http://localhost:8000/api/user-profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => navigate("/auth"));
  }, []);

  if (!user) return <p>Se încarcă...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "auto", paddingTop: 80 }}>
      <h2>Profilul utilizatorului</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
    </div>
  );
};

export default UserProfilePage;
