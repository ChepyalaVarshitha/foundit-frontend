import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportFound.css";

export default function ReportFound() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    item: "",
    description: "",
    location: "",
    phone: "",
    name: "",
    date: ""
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.item ||
      !formData.description ||
      !formData.location ||
      !formData.phone ||
      !formData.name ||
      !formData.date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone number must be 10 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/found-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json","Authorization": "Bearer " + localStorage.getItem("token") 
        },
        body: JSON.stringify({
          title: formData.item,
          description: formData.description,
          location: formData.location,
          phone: formData.phone,
          name: formData.name,
          date_found: formData.date
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      // Show popup
      setSuccess(true);

      // Clear form
      setFormData({
        item: "",
        description: "",
        location: "",
        phone: "",
        name: "",
        date: ""
      });

      // After popup → redirect
      setTimeout(() => {
        setSuccess(false);
        navigate("/found-items");
      }, 1500);

    } catch (error) {
      alert("Failed to submit. Check server.");
      console.error(error);
    }
  };

              if (!localStorage.getItem("token")) {
                    window.location.href = "/login";
  return;
}


  return (
    <div className="lost-form-page">

      <h2 className="form-title">Report Found Item</h2>

      <form className="lost-form" onSubmit={handleSubmit}>

        <label>Item Name:</label>
        <input
          type="text"
          name="item"
          value={formData.item}
          onChange={handleChange}
          placeholder="Enter found item name"
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe color, brand, unique marks..."
          required
        ></textarea>

        <label>Location Found:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Library, Cafeteria"
          required
        />

        <label>Phone No:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter 10-digit number"
          required
        />

        <label>Your Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label>Date Found:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn submit-btn">Submit Report</button>
      </form>

      {success && (
        <div className="popup">
          <div className="popup-box">
            <p>Found Item Report Submitted Successfully ✔</p>
             <button className="close-btn" onClick={() => {setSuccess(false);navigate("/found-items");}}>
                     OK
            </button>

          
          </div>
        </div>
      )}

    </div>
  );
}
