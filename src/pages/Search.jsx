import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [items, setItems] = useState([]);       // search results
  const [recent, setRecent] = useState([]);     // recent 4 queries
  const [loading, setLoading] = useState(false);

  // 1️⃣ Load recent items on page load
  useEffect(() => {
    async function loadRecent() {
      try {
        const res = await fetch("http://localhost:8080api/search/recent");
        const data = await res.json();
        setRecent(data);
      } catch (err) {
        console.error("Failed to load recent items");
      }
    }
    loadRecent();
  }, []);

  // 2️⃣ Handle search input
  const handleSearch = async (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setItems([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080api/search?q=${text}`
      );
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Search failed");
    }

    setLoading(false);
  };

  return (
    <div className="search-page">
      
      <h2 className="search-title">Search Lost & Found Items</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search items..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Loading */}
      {loading && <p style={{ textAlign: "center" }}>Searching...</p>}

      {/* 3️⃣ Show results when searchText is NOT empty */}
      {searchText !== "" && (
        <div className="item-list">
          {items.length === 0 && !loading && (
            <p style={{ textAlign: "center" }}>No results found.</p>
          )}

          {items.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              to={
                item.type === "lost"
                  ? `/lost/${item.id}`
                  : `/found/${item.id}`
              }
              className="item-card-link"
            >
              <div className="item-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 4️⃣ Show RECENT when searchText is empty */}
      {searchText === "" && (
        <>
          <h3 className="recent-title">Recent Queries</h3>

          <div className="item-list">
            {recent.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                to={
                  item.type === "lost"
                    ? `/lost/${item.id}`
                    : `/found/${item.id}`
                }
                className="item-card-link"
              >
                <div className="item-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Dropdown Menu */}
      <div className="dropdown">
        <button 
          className="dropbtn" 
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          New Query ▼
        </button>

        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="/report-lost">Report Lost Item</Link>
            <Link to="/report-found">Report Found Item</Link>
          </div>
        )}
      </div>
    </div>
  );
}
