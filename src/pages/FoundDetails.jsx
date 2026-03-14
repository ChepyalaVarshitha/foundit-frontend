import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./FoundDetails.css";

export default function FoundItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(`http://localhost:8080api/found-items/${id}`);
        if (!response.ok) throw new Error("Item not found");

        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  // ⭐ Claim the item
  async function handleClaim() {
    const confirmed = window.confirm("Mark this item as claimed?");
    if (!confirmed) return;

    setClaiming(true);

    try {
      const response = await fetch(`http://localhost:8080api/found-items/${id}/claim`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to mark item as claimed.");
        setClaiming(false);
        return;
      }

      alert("Item marked as claimed ✔");
      navigate("/found-items");

    } catch (error) {
      alert("Something went wrong.");
    }
  }

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="details-page">
      <div className="details-card">

        <h2>{item.title}</h2>

        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Location:</strong> {item.location}</p>
        <p><strong>Finder Name:</strong> {item.name || "Not provided"}</p>
        <p><strong>Phone:</strong> {item.phone}</p>
        <p><strong>Date Found:</strong> {item.date_found}</p>

        {item.photo && (
          <img
            src={`http://localhost:8080/api/uploads/${item.photo}`}
            alt="Found item"
            className="details-image"
          />
        )}

        <button 
          className="claim-btn"
          onClick={handleClaim}
          disabled={claiming}
        >
          {claiming ? "Processing..." : "Mark as Claimed"}
        </button>

        <Link to="/found-items" className="back-btn">
          ← Back to Found Items
        </Link>

      </div>
    </div>
  );
}
