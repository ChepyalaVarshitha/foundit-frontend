import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LostItems.css";

export default function LostItems() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch lost items
  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/lost-items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch lost items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  return (
    <div className="lost-page">

      <h2 className="lost-title">Lost Items</h2>

      {loading && <p>Loading items...</p>}

      <div className="lost-items-container">
        

        {!loading &&
        items.map((item) => (
        <Link
          to={`/lost/${item.id}`}
             key={item.id}
            className="lost-card-link"
    >
              <div className="lost-card">
               <h3>{item.title}</h3>
                <p>{item.description}</p>

                 <p><strong>Location:</strong> {item.location}</p>
                   <p><strong>Owner:</strong> {item.name}</p>
                     <p><strong>Date:</strong> {item.date_lost}</p>
              </div>
         </Link>
  ))
}

      </div>

      {/* Dropdown */}
      <div className="dropdown">
        <button className="dropbtn" onClick={() => setOpen(!open)}>
          New Query ▼
        </button>

        {open && (
          <div className="dropdown-content">
            <Link to="/report-lost">Report Lost Item</Link>
          </div>
        )}
      </div>

    </div>
  );
}
