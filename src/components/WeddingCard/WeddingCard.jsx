import React from "react";
import "./WeddingCard.css";

export default function WeddingCard() {
  return (
    <section className="invitation-section">
      <div className="invitation-card">

        <div className="card-border">
          <span className="card-ornament">✦</span>

          <p className="eyebrow">TOGETHER WITH THEIR FAMILIES</p>

          <p className="invitation-text">
            JOYFULLY INVITE YOU TO CELEBRATE
            THE BEGINNING OF THEIR FOREVER
          </p>

          <div className="names">
            <h1>Peace</h1>
            <span className="ampersand">&</span>
            <h1>Solomon</h1>
          </div>

          <div className="gold-line">
            <span>❧</span>
          </div>

          <p className="date-label">THE WEDDING CELEBRATION</p>

          <div className="date">
            <span>SATURDAY</span>
            <strong>5</strong>
            <span>DECEMBER · 2026</span>
          </div>

          <div className="event-details">
            <div>
              <h3>THE CEREMONY</h3>
              <p>10:00 AM</p>
              <p>Deeper Christain Life Ministry Headquarters Nnarambia Ahiara Junction, Ahiazu Mbaise, Imo State.</p>
            </div>

            <div className="vertical-line"></div>

            <div>
              <h3>THE RECEPTION</h3>
              <p>12:00 PM</p>
              <p>Community Primary School, Egberede Nguru Aboh-Mbaise L.G.A. Imo State</p>
            </div>
          </div>

          <p className="closing">
            YOUR PRESENCE WILL MAKE OUR DAY
            EVEN MORE BEAUTIFUL.
          </p>

          <a href="#rsvp" className="rsvp-button">
            KINDLY RSVP
          </a>

          <p className="footer-text">
            WITH LOVE, PEACE & SOLOMON
          </p>

          <span className="bottom-ornament">✦</span>
        </div>
      </div>
    </section>
  );
}