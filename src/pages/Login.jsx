import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || "Invalid email or password.");
        return;
      }

      // ⭐ Save token
      localStorage.setItem("token", data.token);

      // ⭐ Save full user data
      localStorage.setItem("user", JSON.stringify(data.user));

      // ⭐ Save USERNAME separately (for navbar)
      localStorage.setItem("username", data.user?.name || email);

      // ⭐ Save User ID if needed later
      localStorage.setItem("userId", data.user?.id);

      setSuccess(true);

    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  const handlePopupClose = () => {
    setSuccess(false);
    navigate("/"); // redirect to homepage
  };

  return (
    <div className="login-page">

      <h2 className="login-title">Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>

        <label>Email / Username:</label>
        <input
          type="text"
          placeholder="Enter your email or name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <div className="password-wrapper">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="toggle-pass"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn login-btn" type="submit">
          Login
        </button>

        <p className="switch-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>

      {success && (
        <div className="popup">
          <div className="popup-box">
            <p>Login Successful ✔</p>
            <button className="close-btn" onClick={handlePopupClose}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}