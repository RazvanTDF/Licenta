import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/auth");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#26415E",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        marginLeft: "auto"
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
