import React,{useState} from "react";
import "./news.css";
import sampleImg from "./hub.png";
import CreateNewsletter from "./CreateNews";


function NewslettersPage() {
  const newsletters = [
    {
      title: "Wipro Insights",
      desc: "Our latest thinking on AI and (much) more!",
    },
    {
      title: "W3Schools Newsletter",
      desc: "Learn with the world's largest web developer site",
    },
    {
      title: "The Monthly Tech-In",
      desc:
        'Your monthly source of "byte-sized" updates on Microsoft innovations.',
    },
    {
      title: "In the Loop",
      desc:
        "A newsletter highlighting trending topics and tools to help navigate work.",
    },
    {
      title: "Gates Notes",
      desc: "The blog of Bill Gates",
    },
  ];
  const [showCreate, setShowCreate] = useState(false);
  const [newsletterData, setNewsletterData] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const handleCreate = (data) => {
    setNewsletterData(data);
    setShowCreate(false);
  };

  return (
    <div className="newsletter-page">

      {/* LEFT SECTION */}
      <div className="newsletter-left">

        <div className="newsletter-header">
          <h2>Newsletters</h2>
          
        
      
       {!showCreate && (
        <button onClick={() => setShowCreate(true)}>
          Create Newsletter
        </button>
      
      )}
      
        </div>

        <p className="count">7 newsletters</p>

        {newsletters.map((item, index) => (
          <div key={index} className="newsletter-item">
            <img src={sampleImg} alt="logo" className="newsletter-logo" />

            <div className="newsletter-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>

            <div className="dots">•••</div>
          </div>
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div className="newsletter-right">
        <div className="promo-card">
          <img src={sampleImg} alt="promo" />
          <h4>The Payments Shed Podcast</h4>
          <p>
            Stay informed on industry news and trends.
          </p>
          <button className="follow-btn">Follow</button>
        </div>

        <div className="footer-links">
          <span>About</span>
          <span>Accessibility</span>
          <span>Help Center</span>
          <span>Privacy & Terms</span>
          <span>Ad Choices</span>
          <span>Advertising</span>
        </div>

        {showModal && (
        <CreateNewsletter onClose={() => setShowModal(false)} />
      )}

        <p className="copyright">
          LinkedIn Corporation © 2026
        </p>
      </div>

    </div>
  );
}

export default NewslettersPage;