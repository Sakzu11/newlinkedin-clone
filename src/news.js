import React, { useState, useEffect } from "react";
import "./news.css";
import sampleImg from "./hub.png";
import CreateNewsletter from "./CreateNews";
import { fetchNewsletters } from './api';

function NewslettersPage() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    fetchNewsletters()
      .then((res) => setNewsletters(res.data))
      .catch(() => setNewsletters([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCreated = (newItem) => {
    setNewsletters([newItem, ...newsletters]);
    setShowCreate(false);
  };

  return (
    <div className="newsletter-page">
      <div className="newsletter-left">
        <div className="newsletter-header">
          <h2>Newsletters</h2>
          {!showCreate && (
            <button onClick={() => setShowCreate(true)}>Create Newsletter</button>
          )}
        </div>

        {showCreate && <CreateNewsletter onClose={() => setShowCreate(false)} onCreated={handleCreated} />}

        <p className="count">{newsletters.length} newsletters</p>

        {loading ? (
          <p>Loading newsletters...</p>
        ) : newsletters.length === 0 ? (
          <p>No newsletters yet.</p>
        ) : (
          newsletters.map((item) => (
            <div key={item.id} className="newsletter-item">
              <img src={sampleImg} alt="logo" className="newsletter-logo" />
              <div className="newsletter-content">
                <h3>{item.title}</h3>
                <p>{item.content?.substring(0, 80)}...</p>
              </div>
              <div className="dots">•••</div>
            </div>
          ))
        )}
      </div>

      <div className="newsletter-right">
        <div className="promo-card">
          <img src={sampleImg} alt="promo" />
          <h4>The Payments Shed Podcast</h4>
          <p>Stay informed on industry news and trends.</p>
          <button className="follow-btn">Follow</button>
        </div>
        <div className="footer-links">
          <span>About</span><span>Accessibility</span><span>Help Center</span>
          <span>Privacy & Terms</span><span>Ad Choices</span><span>Advertising</span>
        </div>
        <p className="copyright">LinkedIn Corporation © 2026</p>
      </div>
    </div>
  );
}

export default NewslettersPage;
