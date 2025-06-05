import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Aplică dark mode global cu tranziție blur
  useEffect(() => {
    document.body.classList.add("transitioning");
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
    const timeout = setTimeout(() => document.body.classList.remove("transitioning"), 1000);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  // ✅ Stil buton dropdown
  const dropdownBtnStyle = {
    padding: "8px 12px",
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 3rem",
        background: "linear-gradient(to bottom, #83A6CE, rgba(255, 255, 255, 0))",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        color: "#fff",
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <img src="/logo_min.jpg" alt="TdF Logo" style={{ height: "40px", borderRadius: "6px" }} />
      </div>

      {/* Dreapta: limbă + info + dark mode */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* 🌍 Dropdown limbă */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowLangDropdown((prev) => !prev)}
            title="Schimbă limba"
            style={{
              fontSize: "1.2rem",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              lineHeight: "1",
              paddingBottom: "2px",
              position: "relative",
              top: "1px",
            }}
          >
            🌍
          </button>

          {showLangDropdown && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                background: "white",
                color: "#0B1B32",
                border: "1px solid #ccc",
                borderRadius: "6px",
                overflow: "hidden",
                zIndex: 999,
              }}
            >
              <button onClick={() => { setLanguage("ro"); setShowLangDropdown(false); }} style={dropdownBtnStyle}>🇷🇴 Română</button>
              <button onClick={() => { setLanguage("en"); setShowLangDropdown(false); }} style={dropdownBtnStyle}>🇬🇧 English</button>
              <button onClick={() => { setLanguage("es"); setShowLangDropdown(false); }} style={dropdownBtnStyle}>🇪🇸 Español</button>
            </div>
          )}
        </div>

        {/* Link „Cum funcționează” doar pe landing */}
        {location.pathname === "/" && (
          <a href="#how-it-works" style={{ color: "white", textDecoration: "none", fontSize: "0.95rem" }}>
            Cum funcționează
          </a>
        )}

        {/* ☀︎ / ☾ */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          title="Comută tema"
          style={{
            fontSize: "1.2rem",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            lineHeight: "1",
            position: "relative",
            top: "1px",
          }}
        >
          {darkMode ? "☀︎" : "☾"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
