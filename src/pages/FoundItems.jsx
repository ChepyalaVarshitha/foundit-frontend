import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FoundItems.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export default function FoundItems() {
  const [open, setOpen] = useState(false);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch found items from backend
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${API_URL}/found-items`);
        if (!response.ok) {
          throw new Error("Failed to fetch items.");
        }

        const data = await response.json();
        console.log("Found items:", data); // Debug: see what data looks like
        setFoundItems(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load found items.");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="found-page">

      <h2 className="found-title">Found Items</h2>

      {/* Loading State */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* Items Display */}
      <div className="found-items-container">
        {foundItems.length > 0 ? (
          foundItems.map((item) => (
            <Link
              to={`/found/${item.id}`}
              key={item.id}
              className="found-card-link"
            >
              <div className="found-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><b>Location:</b> {item.location}</p>
                <p><b>Finder:</b> {item.contactName || "Anonymous"}</p>
                <p><b>Date:</b> {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</p>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p style={{ textAlign: "center" }}>No found items yet.</p>
        )}
      </div>

      {/* Dropdown */}
      <div className="dropdown">
        <button className="dropbtn" onClick={() => setOpen(!open)}>
          New Query ▼
        </button>

        {open && (
          <div className="dropdown-content">
            <Link to="/report-found">Report Found Item</Link>
          </div>
        )}
      </div>
    </div>
  );
}