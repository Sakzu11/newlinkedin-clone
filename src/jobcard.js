




import React from "react";
import "./jobcard.css";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import hubImg from "./hub.png";

function JobCard({ title, company, location, type, logo, promoted }) {
  return (
    <div className="jobListCard">

      {/* LEFT LOGO */}
      <div className="jobListCard__logo">
        <img src={hubImg} alt="company" />
      </div>

      {/* CENTER CONTENT */}
      <div className="jobListCard__info">

        <h3 className="jobListCard__title">
          {title}
          <VerifiedIcon className="verifiedIcon" />
        </h3>

        <p className="jobListCard__company">
          {company} • {location}
        </p>

        <p className="jobListCard__connections">
          1 connection works here
        </p>

        <p className="jobListCard__meta">
          {promoted ? "Promoted · Be an early applicant" : type}
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="jobListCard__actions">
        <CloseIcon className="closeIcon" />
      </div>

    </div>
  );
}

export default JobCard;