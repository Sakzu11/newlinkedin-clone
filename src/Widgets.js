import React from "react";
import "./Widgets.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const NEWS = [
  { heading: "React 18 Released", subtitle: "Top news - 5,000 readers" },
  { heading: "AI Hiring Trends", subtitle: "Trending - 10,000 readers" },
  { heading: "JavaScript Tips", subtitle: "Top news - 7,000 readers" },
  { heading: "Career Growth", subtitle: "2,000 readers" },
  { heading: "Remote Work Surge", subtitle: "Trending - 8,000 readers" },
];

function Widgets() {
  return (
    <div className="Widgets">
      <div className="Widgets__header">
        <h2>LinkedIn News</h2>
      </div>
      {NEWS.map((item, i) => (
        <div className="Widgets__article" key={i}>
          <div className="Widgets__articleLeft">
            <FiberManualRecordIcon fontSize="small" />
          </div>
          <div className="Widgets__articleRight">
            <h4>{item.heading}</h4>
            <p>{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Widgets;
