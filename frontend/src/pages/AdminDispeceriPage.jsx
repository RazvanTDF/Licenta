import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDispeceriPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }

    fetch("http://localhost:8000/api/users/pending/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setPendingUsers(data))
      .catch(() => navigate("/auth"));
  }, []);

  const handleApprove = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8000/api/users/${id}/approve/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setPendingUsers(pendingUsers.filter(user => user.id !== id));
    } else {
      alert("Eroare la aprobare.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: 60 }}>
      <h2>Utilizatori în așteptare</h2>
      {pendingUsers.length === 0 ? (
        <p>Nu sunt utilizatori de aprobat.</p>
      ) : (
        <ul>
          {pendingUsers.map(user => (
            <li key={user.id} style={{ marginBottom: 16 }}>
              {user.username} – {user.email}
              <button
                onClick={() => handleApprove(user.id)}
                style={{ marginLeft: 10 }}
              >
                Aprobă
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDispeceriPage;
