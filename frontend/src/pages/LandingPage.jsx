import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="overlay">
        <nav className="navbar">
          <div className="logo-section">
            <img src="/logo.jpg" alt="Logo" className="logo" />
            <span className="brand">TransportApp</span>
          </div>
          <div className="nav-links">
            <Link to="/auth" className="nav-btn">Autentificare</Link>
            <Link to="/how-it-works" className="nav-btn">Cum funcționează</Link>
          </div>
        </nav>

        <main className="main-content">
          <h1>Bine ai venit în TransportApp</h1>
          <p>Gestionează automat ofertele tale de transport — rapid și elegant.</p>
          <div className="buttons">
            <Link to="/auth" className="btn primary">Înregistrează-te</Link>
            <Link to="/how-it-works" className="btn secondary">Află mai mult</Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
