import { createContext, useContext, useState, useEffect } from "react";

// Limbile suportate
const availableLanguages = ["ro", "en", "es"];

const getInitialLanguage = () => {
  const saved = localStorage.getItem("appLanguage");
  if (availableLanguages.includes(saved)) return saved;
  return "ro";
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  const changeLanguage = (newLang) => {
    if (availableLanguages.includes(newLang)) {
      setLanguage(newLang);
      localStorage.setItem("appLanguage", newLang);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
