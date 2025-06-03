import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Help.css";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in (e.g., accessToken exists)
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <div className="help-page">
      <nav className="navbar workspace-navbar">
        <div
          className="navbar-left"
          onClick={() => {
            if (isLoggedIn) {
              navigate("/Workspace");
            } else {
              navigate("/");
            }
          }}
          style={{ cursor: "pointer" }}
          role="button"
          tabIndex={0}
          aria-label="Go to Workspace"
          onKeyPress={e => {
            if (e.key === "Enter" || e.key === " ") {
              if (isLoggedIn) {
                navigate("/Workspace");
              } else {
                navigate("/");
              }
            }
          }}
        >
          <img src="/logo_min.jpg" alt="Logo" className="logo" />
        </div>

        <div className="navbar-center">
          <span className="workspace-title">Ajutor și informații</span>
        </div>

        <div className="navbar-right">
          <button className="lang-btn" title="Schimbă limba">🌐</button>
          <button className="mode-toggle" title="Light/Dark mode">🌓</button>

          <div className="profile-wrapper">
            <button
              className="profile-icon"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              👤
            </button>

            {showDropdown && (
              <div className="profile-dropdown">
                <a href="/profile">Profil</a>
                <a href="/Workspace">Workspace</a>
                <a
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/";
                  }}
                >
                  Delogare
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="back-to-workspace-bar">
        <button
          onClick={() => navigate("/Workspace")}
          className="back-to-workspace-btn"
        >
          ← Înapoi la Workspace
        </button>
      </div>

      <div className="help-content">
        <h2>Cum funcționează aplicația Transporte del Futuro</h2>
        <p>
          În pagina Workspace, dispecerii pot vizualiza toate ofertele primite automat din email. Aceste oferte conțin informații precum locul de încărcare, destinația, distanța, greutatea mărfii, datele de încărcare/descărcare, prețul oferit sau cel recomandat, precum și alte detalii utile.
        </p>

        <h3>Funcționalități principale:</h3>
        <ul>
          <li><strong>Vizualizare tabel:</strong> Tabelul afișează toate ofertele în ordine cronologică. Poți da click pe orice rând pentru a deschide o fereastră cu detalii suplimentare despre ofertă.</li>
          <li><strong>Sortare:</strong> Coloanele Distanță, Greutate și Preț permit sortarea crescătoare/descrescătoare prin click pe săgețile din antet.</li>
          <li><strong>Filtrare:</strong> Poți filtra ofertele după locație (Pornire, Destinație), oferte cu/ fără preț, și multe altele. Apasă pe butonul „Filtre” din stânga sus pentru a deschide panoul de filtre.</li>
          <li><strong>Refresh și Auto-refresh:</strong> Butoanele din dreapta sus permit reîncărcarea manuală a ofertelor sau activarea reîmprospătării automate la fiecare minut.</li>
          <li><strong>Paginare:</strong> Doar 10 oferte sunt afișate pe pagină. Navighează între pagini folosind controalele din partea de jos stânga.</li>
          <li><strong>Buton Ajutor:</strong> În colțul din dreapta jos se află un buton care deschide această pagină pentru mai multe informații.</li>
          <li><strong>Modul Dark/Light:</strong> Poți comuta între temele întunecată și luminoasă din colțul din dreapta sus al barei de navigație.</li>
          <li><strong>Profil și delogare:</strong> Iconița de profil din colțul dreapta sus oferă acces rapid la pagina de profil sau posibilitatea de a te deloga.</li>
        </ul>

        <h3>Întrebări frecvente:</h3>
        <p><strong>Ce fac dacă nu văd oferte?</strong><br />Asigură-te că ești autentificat și că există emailuri procesate. Folosește butonul Refresh pentru a reîncărca datele.</p>

        <p><strong>Ofertele mele nu au preț?</strong><br />Este posibil ca emailurile respective să nu conțină un preț. Poți vedea totuși prețul recomandat generat automat.</p>

        <p><strong>Filtrele nu se aplică?</strong><br />Verifică dacă ai completat corect filtrele și dacă sunt active. Le poți șterge individual din etichetele de sub butonul Filtre.</p>

        <p className="contact-note">
          Pentru întrebări suplimentare sau probleme tehnice, vă rugăm să contactați administratorul aplicației. Datele de contact se regăsesc în footer.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
