import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./LostDetails.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export default function LostItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")); // 🔥 check login

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URL}/lost-items/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Failed to load item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  // 🔥 Mark as Claimed Function
  const handleClaim = async () => {
    if (!window.confirm("Are you sure this item has been claimed?")) return;

    try {
      const response = await fetch(
        `${API_URL}/lost-items/${id}/claim`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to mark item as claimed");
        return;
      }

      alert("Item marked as claimed! ✔");

      // Redirect to list
      navigate("/lost-items");
    } catch (error) {
      alert("Something went wrong.");
      console.error(error);
    }
  };

  if (loading) return <p className="details-loading">Loading...</p>;
  if (!item) return <p className="details-loading">Item not found.</p>;

  return (
    <div className="details-page">
      <div className="details-card">
        <h2>{item.title}</h2>

        {item.image && (
          <img
            src={`${API_URL}/uploads/${item.image}`}
            alt="Lost Item"
            className="details-image"
          />
        )}

        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Location Lost:</strong> {item.location}</p>
        <p><strong>Owner Name:</strong> {item.contactName || "Not provided"}</p>
        <p><strong>Phone:</strong> {item.phoneNumber || "Not provided"}</p>
        <p><strong>Date Lost:</strong> {item.date ? new Date(item.date).toLocaleDateString() : "Not provided"}</p>

        {/* Show Claim Button ONLY if not already claimed AND user is logged in */}
        {user && !item.claimed && (
          <button className="claim-btn" onClick={handleClaim}>
            Mark as Claimed
          </button>
        )}

        <Link className="back-btn" to="/lost-items">⬅ Back to Lost Items</Link>
      </div>
    </div>
  );
}