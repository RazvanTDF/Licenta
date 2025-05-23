import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  // Scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo_min.jpg" alt="TdF Logo" className="logo" />
        </div>
        <div className="navbar-right">
          <button className="lang-btn" title="Schimbă limba">🌐</button>
          <a href="#how-it-works" className="nav-link">Cum funcționează</a>
          <button className="mode-toggle" title="Light/Dark mode">🌓</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
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
          Transporte del Futuro este o aplicație dedicată dispecerilor din domeniul transporturilor.
          Automatizează procesul de preluare a ofertelor din email, le afișează într-o interfață clară
          și îți oferă posibilitatea de a răspunde rapid și eficient.
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
