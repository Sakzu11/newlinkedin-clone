import React from "react";
import "./Widgets.css";
// import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="Widgets__article" key={heading}>
      <div className="Widgets__articleLeft">
      <FiberManualRecordIcon fontSize="small" />
      </div>
      <div className="Widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="Widgets">
      <div className="Widgets__header">
        <h2>LinkedIn News</h2>
        {/* <InfoIcon /> */}
      </div>

      {newsArticle("React 18 Released", "Top news - 5,000 readers")}
      {newsArticle("AI Hiring Trends", "Trending - 10,000 readers")}
      {newsArticle("JavaScript Tips", "Top news - 7,000 readers")}
      {newsArticle("Career Growth", "2,000 readers")}
      {newsArticle("React 18 Released", "Top news - 5,000 readers")}
      {newsArticle("AI Hiring Trends", "Trending - 10,000 readers")}
      {newsArticle("JavaScript Tips", "Top news - 7,000 readers")}
      {newsArticle("Career Growth", "2,000 readers")}
      {newsArticle("React 18 Released", "Top news - 5,000 readers")}
      {newsArticle("AI Hiring Trends", "Trending - 10,000 readers")}
      {newsArticle("JavaScript Tips", "Top news - 7,000 readers")}
      {newsArticle("Career Growth", "2,000 readers")}
      {newsArticle("React 18 Released", "Top news - 5,000 readers")}
      {newsArticle("AI Hiring Trends", "Trending - 10,000 readers")}
      {newsArticle("JavaScript Tips", "Top news - 7,000 readers")}
      {newsArticle("Career Growth", "2,000 readers")}
      {newsArticle("React 18 Released", "Top news - 5,000 readers")}
      
    </div>
  );
}

export default Widgets;
