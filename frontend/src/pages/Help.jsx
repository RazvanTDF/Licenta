// Help.jsx
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../translations/translations";
import "./Help.css";

const Help = () => {

  const { language, changeLanguage } = useLanguage();
  const navigate = useNavigate();

  const translate = (key) => translations[language]?.[key] || key;

  // State pentru dark mode
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // State pentru dropdown
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Verificăm dacă utilizatorul e logat (dacă există accessToken)
  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);


  const goToWorkspace = () => {
    if (isLoggedIn) navigate("/Workspace");
    else navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

 
  const dropdownBtnStyle = {
    padding: "0.5rem 1rem",
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
  };

  return (
    <div className="help-page">
      {/* NAVBAR: identic cu cel din Workspace */}
      <nav className="navbar workspace-navbar">
        <div
          className="navbar-left"
          onClick={goToWorkspace}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          aria-label="Go to Workspace"
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") goToWorkspace();
          }}
        >
          <img src="/logo_min.jpg" alt="Logo" className="logo" />
        </div>

        <div className="navbar-center">
          <span className="workspace-title">
            {translate("helpTitle")}
          </span>
        </div>

        <div
          className="navbar-right"
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          {/* 🚩 Dropdown lang */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowLangDropdown((prev) => !prev)}
              title={translate("changeLanguage")}
              style={{
                fontSize: "1.2rem",
                background: "none",
                border: "none",
                color: darkMode ? "white" : "#0B1B32",
                cursor: "pointer",
                lineHeight: "1",
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
                  zIndex: 9999,
                }}
              >
                <button
                  onClick={() => {
                    changeLanguage("ro");
                    setShowLangDropdown(false);
                  }}
                  style={dropdownBtnStyle}
                >
                  Română
                </button>
                <button
                  onClick={() => {
                    changeLanguage("en");
                    setShowLangDropdown(false);
                  }}
                  style={dropdownBtnStyle}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    changeLanguage("es");
                    setShowLangDropdown(false);
                  }}
                  style={dropdownBtnStyle}
                >
                  Español
                </button>
              </div>
            )}
          </div>

          {/* ☀︎/☾ Light-Dark mode */}
          <button
            className="mode-toggle"
            title={translate("toggleDarkMode")}
            onClick={() => setDarkMode((prev) => !prev)}
            style={{
              fontSize: "1.2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              lineHeight: "1",
              position: "relative",
              top: "1px",
            }}
          >
            {darkMode ? "☀︎" : "☾"}
          </button>

          {/* 🔒 Profil + dropdown de logout/navigare */}
          <div className="profile-wrapper">
            <button
              className="profile-icon"
              onClick={() => setShowProfileDropdown((prev) => !prev)}
            >
              👤
            </button>
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <a href="/profile">{translate("profile")}</a>
                {isLoggedIn && (
                  <a href="/Workspace">{translate("workspace")}</a>
                )}
                <a href="#" onClick={handleLogout}>
                  {translate("logout")}
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ========== Buton „Înapoi la Workspace” ========== */}
      <div className="back-to-workspace-bar">
        <button
          onClick={() => navigate("/Workspace")}
          className="back-to-workspace-btn"
        >
          ← {translate("backToWorkspace")}
        </button>
      </div>

      {/* ==========  paginii de Ajutor ========== */}
      <div className="help-content">
        <h2>{translate("howItWorksTitle")}</h2>
        <p>{translate("helpParagraph1")}</p>

        <h3>{translate("mainFeaturesTitle")}</h3>
        <ul>
          <li>
            <strong>{translate("featureViewTable")}:</strong>{" "}
            {translate("featureViewTableDesc")}
          </li>
          <li>
            <strong>{translate("featureSorting")}:</strong>{" "}
            {translate("featureSortingDesc")}
          </li>
          <li>
            <strong>{translate("featureFiltering")}:</strong>{" "}
            {translate("featureFilteringDesc")}
          </li>
          <li>
            <strong>{translate("featureRefresh")}:</strong>{" "}
            {translate("featureRefreshDesc")}
          </li>
          <li>
            <strong>{translate("featurePagination")}:</strong>{" "}
            {translate("featurePaginationDesc")}
          </li>
          <li>
            <strong>{translate("featureHelpButton")}:</strong>{" "}
            {translate("featureHelpButtonDesc")}
          </li>
          <li>
            <strong>{translate("featureDarkMode")}:</strong>{" "}
            {translate("featureDarkModeDesc")}
          </li>
          <li>
            <strong>{translate("featureProfile")}:</strong>{" "}
            {translate("featureProfileDesc")}
          </li>
        </ul>

        <h3>{translate("faqTitle")}</h3>
        <p>
          <strong>{translate("faqQuestion1")}</strong><br />
          {translate("faqAnswer1")}
        </p>
        <p>
          <strong>{translate("faqQuestion2")}</strong><br />
          {translate("faqAnswer2")}
        </p>
        <p>
          <strong>{translate("faqQuestion3")}</strong><br />
          {translate("faqAnswer3")}
        </p>

        <p className="contact-note">
          {translate("helpContactNote")}
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
