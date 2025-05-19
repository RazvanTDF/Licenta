import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
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
        setError(data.error || "Eroare la autentificare.");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.access);
        navigate("/profile");
      } else {
        alert("Cont creat cu succes! Acum te poți loga.");
        setIsLogin(true);
      }
    } catch (err) {
      setError("Eroare de rețea.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", paddingTop: 80 }}>
      <h2>{isLogin ? "Login" : "Înregistrare"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        )}
        <input
          name="password"
          type="password"
          placeholder="Parolă"
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p onClick={toggleMode} style={{ cursor: "pointer", marginTop: 10 }}>
        {isLogin ? "Nu ai cont? Înregistrează-te" : "Ai deja cont? Login"}
      </p>
    </div>
  );
};

export default AuthPage;
