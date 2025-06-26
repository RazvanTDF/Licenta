import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PendingPage.css";

const PendingPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleBack = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="pending-wrapper">
      <div className="pending-card">
        {/* ☀︎ / ☾ toggle în colțul cardului */}
        <button
          className="mode-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
          title="Switch theme"
        >
          {darkMode ? "☀︎" : "☾"}
        </button>

        <img src="../public/logo.jpg" alt="Logo" className="pending-logo" />
        <h2>Your account is pending approval</h2>
        <p>Please wait until an admin approves your access.</p>
        <div className="pending-buttons">
          <a href="mailto:razvantdf@gmail.com">
            <button className="contact-btn">Contact Admin</button>
          </a>
          <button className="back-btn" onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
