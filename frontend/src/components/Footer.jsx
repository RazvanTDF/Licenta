import React from "react";
import "../pages/LandingPage.css"; // sau ../LandingPage.css dacă e în rădăcină

const Footer = () => {
  return (
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
  );
};

export default Footer;
