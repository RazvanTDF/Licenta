import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Footer from "../components/Footer";

const LandingPage = () => {
  // Scroll reveal
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

  // Dark mode logic + background video
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [videoSource, setVideoSource] = useState(
    darkMode ? "/bg-dark.mp4" : "/bg-video.mp4"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);

    // Tranziție între videouri
    const timeout = setTimeout(() => {
      setVideoSource(darkMode ? "/bg-dark.mp4" : "/bg-video.mp4");
    }, 300);

    return () => clearTimeout(timeout);
  }, [darkMode]);

  const toggleDarkMode = () => {
    document.body.classList.add("transitioning");

    setTimeout(() => {
      setDarkMode((prev) => !prev);

      setTimeout(() => {
        document.body.classList.remove("transitioning");
      }, 800);
    }, 0);
  };

  return (
    <div className="landing-page">
      <div className={`transition-overlay ${darkMode ? "dark" : "light"}`}></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo_min.jpg" alt="TdF Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <button className="lang-btn" title="Schimbă limba">🌐</button>
          <a href="#how-it-works" className="nav-link">Cum funcționează</a>
          <button className="mode-toggle" onClick={toggleDarkMode} title="Light/Dark mode">🌓</button>
        </div>
      </nav>

      {/* Hero Section cu fundal video */}
      <section className="hero">
        <video
          className="hero-bg"
          autoPlay
          loop
          muted
          playsInline
          key={videoSource}
        >
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>Transporte del Futuro</h1>
          <p className="motto">Ești gata să devii cel mai bun dispecer din firma ta?</p>
          <Link to="/auth" className="hero-btn">Conectează-te</Link>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="how-it-works reveal">
        <h2>Cum funcționează aplicația?</h2>
        <div className="steps">
          <div className="step reveal">
            <img src="/left_landing.png" alt="Procesare Gmail" />
            <p>Procesare Gmail</p>
          </div>
          <div className="step reveal">
            <img src="/middle_landing.png" alt="Afișare tabelară" />
            <p>Afișare tabelară</p>
          </div>
          <div className="step reveal">
            <img src="/right_landing.png" alt="Răspuns la ofertă" />
            <p>Răspuns la ofertă</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about reveal">
        <h2>Despre aplicație</h2>
        <p>
          Transporte del Futuro este soluția digitală modernă concepută special pentru dispecerii din domeniul transporturilor...
          <br /><br />
          TdF este mai mult decât o aplicație – este un partener inteligent care îți optimizează munca, îți salvează timp prețios și îți oferă un avantaj competitiv real...
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
