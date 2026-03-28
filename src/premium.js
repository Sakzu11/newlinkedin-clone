import { useEffect, useState } from "react";
import "./premium.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fetchProfile } from "./api";

function Premium({ closeModal }) {
  const [name, setName] = useState("there");

  useEffect(() => {
    fetchProfile()
      .then(r => {
        const n = r.data.user?.first_name || r.data.user?.username || "there";
        setName(n);
      })
      .catch(() => {});
  }, []);

  const plans = [
    { name: "Career", price: "₹0", period: "1 month free, then ₹2,499/mo", color: "#c37d16", features: ["See who viewed your profile", "InMail messages", "Top Applicant insights", "Resume & cover letter tips"] },
    { name: "Business", price: "₹3,299", period: "/month", color: "#057642", features: ["Unlimited people browsing", "Business insights", "Lead recommendations", "CRM integrations"] },
  ];

  return (
    <div className="premium-overlay" onClick={closeModal}>
      <div className="premium-box" onClick={e => e.stopPropagation()}>
        <div className="premium-header">
          <div>
            <h2>{name}, job search smarter with Premium</h2>
            <p>1 month free — cancel anytime</p>
          </div>
          <button className="premium-close" onClick={closeModal}><CloseIcon /></button>
        </div>

        <div className="premium-users">
          {[1,2,3,4,5].map(i => (
            <img key={i} src={`https://i.pravatar.cc/32?img=${i}`} alt="" />
          ))}
          <span>Millions of members use Premium</span>
        </div>

        <div className="premium-plans">
          {plans.map(plan => (
            <div key={plan.name} className="premium-plan" style={{ borderTop: `4px solid ${plan.color}` }}>
              <h3 style={{ color: plan.color }}>Premium {plan.name}</h3>
              <div className="premium-price">
                <span className="premium-price__amount">{plan.price}</span>
                <span className="premium-price__period">{plan.period}</span>
              </div>
              <ul>
                {plan.features.map(f => (
                  <li key={f}><CheckCircleIcon style={{ fontSize: 16, color: plan.color }} />{f}</li>
                ))}
              </ul>
              <button className="premium-btn" style={{ background: plan.color }}>
                {plan.name === "Career" ? "Try free for 1 month" : `Get ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        <p className="premium-note">
          We'll remind you 7 days before your trial ends. Cancel anytime before then.
        </p>
      </div>
    </div>
  );
}

export default Premium;
