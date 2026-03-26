import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportLost.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export default function ReportLost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    name: "",
    date_lost: "",
    
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.phone ||
      !formData.name ||
      !formData.date_lost
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone number must be 10 digits.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/lost-items`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token") 
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          phoneNumber: formData.phone,      // ← matches backend field name
          contactName: formData.name,        // ← matches backend field name
          date: formData.date_lost           // ← matches backend field name (date, not date_lost)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error submitting lost item.");
        return;
      }

      setSuccess(true);

      setFormData({
        title: "",
        description: "",
        location: "",
        phone: "",
        name: "",
        date_lost: "",
        
      });

    } catch (error) {
      alert("Something went wrong. Try again.");
      console.error(error);
    }
  };

  const handlePopupClose = () => {
    setSuccess(false);
    navigate("/lost-items");
  };

  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="lost-form-page">
      <h2 className="form-title">Report Lost Item</h2>

      <form className="lost-form" onSubmit={handleSubmit}>

        <label>Item Name:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter lost item name"
        />

        <label>Description:</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe color, brand, unique marks..."
        ></textarea>

        <label>Location Lost:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Library, Cafeteria"
        />

        <label>Phone No:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter 10-digit number"
        />

        <label>Your Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        <label>Date Lost:</label>
        <input
          type="date"
          name="date_lost"
          value={formData.date_lost}
          onChange={handleChange}
        />

        <button type="submit" className="btn submit-btn">Submit Report</button>
      </form>

      {success && (
        <div className="popup">
          <div className="popup-box">
            <p>Lost Item Report Submitted Successfully ✔</p>
            <button className="close-btn" onClick={handlePopupClose}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}