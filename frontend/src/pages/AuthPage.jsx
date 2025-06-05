import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import translations from "../translations/translations";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  // 🔒 Redirect dacă deja logat
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/workspace", { replace: true });
  }, [navigate]);

  // Aplică dark mode pe body
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin
      ? "http://localhost:8000/api/auth/login/"
      : "http://localhost:8000/api/auth/register/";

    const payload = {
      username: formData.username,
      password: formData.password,
      ...(isLogin ? {} : { email: formData.email, role: "pending" }),
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.genericError);
        return;
      }

      if (isLogin) {
        localStorage.setItem("accessToken", data.access);
        navigate("/workspace", { replace: true });
      } else {
        alert(t.successRegister);
        setIsLogin(true);
      }
    } catch (err) {
      setError(t.networkError);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* ☀︎ / ☾ toggle */}
        <button
          className="mode-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
          title="Switch theme"
        >
          {darkMode ? "☀︎" : "☾"}
        </button>

        <h2>{isLogin ? t.loginTitle : t.registerTitle}</h2>
        <form onSubmit={handleSubmit} key={isLogin ? "login" : "register"}>
          <input
            name="username"
            type="text"
            placeholder={t.username}
            onChange={handleChange}
            required
          />
          {!isLogin && (
            <input
              name="email"
              type="email"
              placeholder={t.email}
              onChange={handleChange}
              required
            />
          )}
          <input
            name="password"
            type="password"
            placeholder={t.password}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {isLogin ? t.loginBtn : t.registerBtn}
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p onClick={toggleMode}>
          {isLogin ? t.toggleToRegister : t.toggleToLogin}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
