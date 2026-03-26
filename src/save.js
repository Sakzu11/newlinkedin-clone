import React, { useState } from "react";
import "./save.css";
import noJobImage from "./no-job.png";

function SavedJobs() {
  const [activeTab, setActiveTab] = useState("Saved");


  return (
    <div className="jobsContainer">
      <h1 className="jobsTitle">My Jobs</h1>

      {/* Tabs */}
      <div className="jobsTabs">
        {["Saved", "In Progress", "Applied", "Archived"].map((tab) => (
          <button
            key={tab}
            className={`tabButton ${
              activeTab === tab ? "activeTab" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {activeTab === "Saved" && (
        <div className="emptyState">
         <img src={noJobImage} alt="No Jobs" />

          <h2>No recent job activity</h2>
          <p>
            Find new opportunities and manage your job search progress here.
          </p>

          <button className="searchBtn">Search for jobs</button>
        </div>
      )}
       {activeTab === "In Progress" && (
        <div className="emptyState">
         <img src={noJobImage} alt="No Jobs" />

          <h2>No recent job activity</h2>
          <p>
            Find new opportunities and manage your job search progress here.
          </p>

          <button className="searchBtn">Search for jobs</button>
        </div> 
      )}
      
       {activeTab === "Applied" && (
        <div className="emptyState">
         <img src={noJobImage} alt="No Jobs" />

          <h2>No recent job activity</h2>
          <p>
            Find new opportunities and manage your job search progress here.
          </p>

          <button className="searchBtn">Search for jobs</button>
        </div>
      )}
       {activeTab === "Archived" && (
        <div className="emptyState">
         <img src={noJobImage} alt="No Jobs" />

          <h2>No recent job activity</h2>
          <p>
            Find new opportunities and manage your job search progress here.
          </p>

          <button className="searchBtn">Search for jobs</button>
        </div>
      )}
    </div>
  );
}

export default SavedJobs;