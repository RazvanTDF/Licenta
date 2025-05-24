import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

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

  // Dark mode logic
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [heroImage, setHeroImage] = useState(darkMode ? "/dbg.png" : "/bg.png");

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    document.body.classList.add("transitioning");

    setTimeout(() => {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      

      setTimeout(() => {
        setHeroImage(newDarkMode ? "/dbg.png" : "/bg.png");
      }, 300);

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

      {/* Hero Section cu imagine de fundal fluidă */}
      <section className="hero">
        <img
          src={heroImage}
          alt="Hero Background"
          className="hero-bg"
        />
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
          Transporte del Futuro este soluția digitală modernă concepută special pentru dispecerii din domeniul transporturilor. Într-un domeniu în care viteza de reacție și organizarea eficientă fac diferența, aplicația noastră transformă modul în care sunt gestionate ofertele de transport primite pe email.
          <br /><br />
          Dispecerii primesc zilnic zeci sau chiar sute de emailuri de la diferite depozite, fiecare conținând informații esențiale despre posibile transporturi. Procesul clasic – deschiderea manuală a fiecărui email, extragerea detaliilor relevante și evaluarea rapidă a ofertelor – este consumator de timp și supus erorilor. Transporte del Futuro vine să schimbe acest scenariu.
          <br /><br />
          TdF este mai mult decât o aplicație – este un partener inteligent care îți optimizează munca, îți salvează timp prețios și îți oferă un avantaj competitiv real. Este alegerea modernă pentru dispecerii care vor să lucreze mai organizat, mai rapid și mai eficient.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <img src="/logo.jpg" alt="TdF Full Logo" className="footer-logo" />
          <p>📍 Timișoara, România</p>
        </div>
        <div className="footer-center">
          <p>© 2025 Todor Ovidiu-Răzvan. Toate drepturile rezervate.</p>
        </div>
        <div className="footer-right">
          <p><strong>Contact</strong></p>
          <p>razvantdf@gmail.com</p>
          <p>ovidiu.todor@student.upt.ro</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;