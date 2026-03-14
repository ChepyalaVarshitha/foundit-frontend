import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get username from localStorage
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        <h1 className="logo">Lost & Found Portal</h1>

        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/search"
                className={location.pathname === "/search" ? "active" : ""}
              >
                Search
              </Link>
            </li>

            <li>
              <Link
                to="/lost-items"
                className={location.pathname === "/lost-items" ? "active" : ""}
              >
                Lost Item
              </Link>
            </li>

            <li>
              <Link
                to="/found-items"
                className={location.pathname === "/found-items" ? "active" : ""}
              >
                Found Item
              </Link>
            </li>

            {/* 🔥 If logged in → show username + Logout */}
            {token ? (
              <>
                <li className="nav-username">👤 {username}</li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              /* 🔥 If NOT logged in → show Login */
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
