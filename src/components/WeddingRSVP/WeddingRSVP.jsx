
import React, { useState } from "react";
import "./WeddingRSVP.css";


export default function WeddingRSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "yes",
    guests: "1",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Demo only: connect this to your backend or API.
      // Example: await fetch("/api/rsvp", { method: "POST", ... })

      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("RSVP response:", formData);

      setSubmitted(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-container">

        <p className="rsvp-eyebrow">WE WOULD LOVE TO SEE YOU THERE</p>

        <h2>Kindly RSVP</h2>

        <p className="rsvp-intro">
          Your presence would mean the world to us.
          Please let us know if you will be joining our celebration.
        </p>

        {submitted ? (
          <div className="rsvp-success">
            <span className="success-icon">✦</span>
            <h3>Thank You, {formData.name}!</h3>
            <p>
              {formData.attendance === "yes"
                ? "We are delighted that you will be celebrating with us!"
                : "Thank you for letting us know. You will be missed and will remain in our hearts."}
            </p>
            <p className="success-footer">
              With love, Peace & Solomon
            </p>
          </div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="name">FULL NAME</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>WILL YOU BE ATTENDING?</label>

              <div className="attendance-options">
                <label className={`attendance-option ${formData.attendance === "yes" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={formData.attendance === "yes"}
                    onChange={handleChange}
                  />
                  <span>Joyfully Accept</span>
                </label>

                <label className={`attendance-option ${formData.attendance === "no" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={formData.attendance === "no"}
                    onChange={handleChange}
                  />
                  <span>Regretfully Decline</span>
                </label>
              </div>
            </div>

            {formData.attendance === "yes" && (
              <div className="form-group">
                <label htmlFor="guests">NUMBER OF PEOPLE ATTENDING</label>

                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((number) => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? "Person" : "People"}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message">A LITTLE NOTE (OPTIONAL)</label>
              <textarea
                id="message"
                name="message"
                placeholder="Leave us a lovely message..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="submit-rsvp"
              disabled={loading}
            >
              {loading ? "SUBMITTING..." : "SEND MY RSVP"}
            </button>

            <p className="rsvp-note">
              Kindly respond before the RSVP deadline.
            </p>
          </form>
        )}

      </div>
    </section>
  );
}
