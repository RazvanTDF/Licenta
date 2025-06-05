import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../translations/translations";
import "../pages/LandingPage.css"; // sau ../LandingPage.css

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/logo.jpg" alt="TdF Full Logo" className="footer-logo" />
        <p>📍 {t.footerLocation}</p>
      </div>
      <div className="footer-center">
        <p>{t.footerCopyright}</p>
      </div>
      <div className="footer-right">
        <p><strong>{t.footerContact}</strong></p>
        <p>razvantdf@gmail.com</p>
        <p>ovidiu.todor@student.upt.ro</p>
      </div>
    </footer>
  );
};

export default Footer;
