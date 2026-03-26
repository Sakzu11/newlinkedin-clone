import React,{useEffect} from "react";

import "./premium.css";
import CloseIcon from "@mui/icons-material/Close";

function Premium({ closeModal }) {
 


  return (
    <div className="modalOverlay" onClick={closeModal}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modalHeader">
          <h2>Harshada, job search smarter</h2>
          <CloseIcon className="closeIcon" onClick={closeModal} />
        </div>
        
      

        {/* Content */}
        <div className="modalContent">
          <ul>
            <li>✔ See jobs where you’d be a top applicant</li>
            <li>✔ Directly message recruiters with InMail</li>
            <li>✔ Get cover letter and resume tips</li>
            <li>✔ Join live talks with career experts</li>
          </ul>

          {/* Users */}
          <div className="users">
            <img src="https://i.pravatar.cc/30?img=1" alt="" />
            <img src="https://i.pravatar.cc/30?img=2" alt="" />
            <img src="https://i.pravatar.cc/30?img=3" alt="" />
            <span>Shreyash and millions of members use Premium</span>
          </div>

          {/* Button */}
          <button className="premiumBtn">
            Try 1 month of Premium for ₹0
          </button>

          <p className="note">
            1-month free trial. Cancel hassle-free. We'll remind you 7 days before your trial ends.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Premium;