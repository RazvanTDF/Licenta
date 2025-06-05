import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../translations/translations";
import "./LandingPage.css";
import Footer from "../components/Footer";
import HowItWorks from "../components/howitworks";


const LandingPage = () => {
  const { language, changeLanguage } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isDispecer, setIsDispecer] = useState(false);

  const dropdownBtnStyle = {
    padding: "8px 12px",
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px"
  };

  const [videoSource, setVideoSource] = useState(
    darkMode ? "/bg-dark.mp4" : "/bg-video.mp4"
  );

  // Setare dark mode și video în funcție de mod
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);

    const timeout = setTimeout(() => {
      setVideoSource(darkMode ? "/bg-dark.mp4" : "/bg-video.mp4");
    }, 300);

    return () => clearTimeout(timeout);
  }, [darkMode]);

  // Tranziție dark mode
  const toggleDarkMode = () => {
    document.body.classList.add("transitioning");
    setTimeout(() => {
      setDarkMode((prev) => !prev);
      setTimeout(() => {
        document.body.classList.remove("transitioning");
      }, 800);
    }, 0);
  };

  // Scroll reveal pentru animații
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  // Verifică dacă utilizatorul e autentificat și dispecer
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    fetch("http://localhost:8000/api/user-profile/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.role === "dispecer") {
          setIsDispecer(true);
        }
      })
      .catch(() => setIsDispecer(false));
  }, []);

  return (
    <div className="landing-page">
      <div className={`transition-overlay ${darkMode ? "dark" : "light"}`}></div>

      {/* Navbar simplu */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo_min.jpg" alt="TdF Logo" className="logo" />
        </div>
        <div className="navbar-right" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
                <button onClick={() => { changeLanguage("ro"); setShowLangDropdown(false); }} style={dropdownBtnStyle}>
                  Română
                </button>
                <button onClick={() => { changeLanguage("en"); setShowLangDropdown(false); }} style={dropdownBtnStyle}>
                  English
                </button>
                <button onClick={() => { changeLanguage("es"); setShowLangDropdown(false); }} style={dropdownBtnStyle}>
                  Español
                </button>
              </div>
            )}
          </div>

          <a
            href="#how-it-works"
            className="nav-link"
            style={{ color: "white", textDecoration: "none", fontSize: "0.95rem" }}
          >
            {t.howItWorks}
          </a>

          <button
            onClick={toggleDarkMode}
            title="Light/Dark mode"
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

      {/* Hero Section */}
      <section className="hero">
        <video className="hero-bg" autoPlay loop muted playsInline key={videoSource}>
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>{t.title}</h1>
          <p className="motto">{t.motto}</p>
          <button
            className="hero-btn"
            onClick={() => navigate(isDispecer ? "/workspace" : "/auth")}
          >
            {isDispecer ? t.goToWorkspace : t.connect}
          </button>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />


      {/* About */}
      <section className="about reveal">
        <h2>{t.about}</h2>
        <p>
          {t.aboutText.split("\n\n").map((line, index) => (
            <span key={index}>
              {line}
              <br /><br />
            </span>
          ))}
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
