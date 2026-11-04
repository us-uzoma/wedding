
import React, { useEffect, useState } from "react";
import "./WeddingDetails.css";

const weddingDate = new Date("2026-12-05T10:00:00");

function getTimeLeft() {
  const difference = weddingDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function WeddingDetails() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Grace",
      relationship: "Bride's Best Friend",
      message:
        "Watching you both grow together has been one of life's greatest blessings. May your home always be filled with laughter, patience and endless love.",
    },
    {
      name: "Oluwasegun Adesanya",
      relationship: "Groom's Friend",
      message:
        "I have seen the friendship, the laughter and the beautiful bond you share. You two remind us that true love is worth celebrating.",
    },
    {
      name: "Stan",
      relationship: "Family Friend",
      message:
        "May this beautiful beginning lead to a lifetime of wonderful memories. May every new chapter bring you closer together.",
    },
  ];

  return (
    <section className="wedding-details">

      {/* COUNTDOWN */}
      <div className="countdown-section">
        <p className="section-eyebrow">THE BIG DAY IS ALMOST HERE</p>
        <h2>Counting Down to Forever</h2>
        <p className="section-description">
        ...and Solomon found his Peace with a lifetime of beautiful memories.
        </p>

        <div className="countdown-grid">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div className="countdown-box" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="countdown-decoration">✦</div>
      </div>

      {/* VENUE DIRECTIONS */}
      <div className="venue-section">
        <p className="section-eyebrow">JOIN US AS WE SAY I DO</p>
        <h2>Where to Find Us</h2>
        <p className="section-description">
          We cannot wait to celebrate this special day with you.
        </p>

        <div className="venue-grid">

          <div className="venue-card">
            <div className="venue-icon">✧</div>
            <p className="venue-time">10:00 AM</p>
            <h3>The Ceremony</h3>
            <p className="venue-name">Deeper Christain Life Ministry Headquarters.</p>
            <p className="venue-address">
              Nnarambia Ahiara Junction, Ahiazu Mbaise, Imo State.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=St+Peters+Cathedral"
              target="_blank"
              rel="noreferrer"
              className="direction-button"
            >
              GET DIRECTIONS 
            </a>
          </div>

          <div className="venue-card">
            <div className="venue-icon">✧</div>
            <p className="venue-time">12:00 PM</p>
            <h3>The Reception</h3>
            <p className="venue-name">Community Primary School</p>
            <p className="venue-address">
              Egberede Nguru Aboh-Mbaise L.G.A. Imo State.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Grand+Ballroom"
              target="_blank"
              rel="noreferrer"
              className="direction-button"
            >
              GET DIRECTIONS 
            </a>
          </div>

        </div>
      </div>

      {/* TESTIMONIES */}
      <div className="testimonies-section">
        <p className="section-eyebrow">LOVE IS EVEN MORE BEAUTIFUL WHEN SHARED</p>
        <h2>Words From Our Loved Ones</h2>
        <p className="section-description">
          A little love, a few kind words and countless blessings.
        </p>

        <div className="testimony-grid">
          {testimonials.map((item, index) => (
            <div className="testimony-card" key={index}>
              <span className="quote-mark">“</span>
              <p className="testimony-message">{item.message}</p>
              <div className="testimony-divider"></div>
              <h3>{item.name}</h3>
              <span className="relationship">{item.relationship}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}