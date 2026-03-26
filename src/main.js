import React from "react";
import "./main.css";
import ImageImg from "./image.png";
import profilePicImg from "./profilepic.png";

const ProfilePage = () => {
  return (
    <div className="profile-container">
      {/* LEFT SIDE */}
      <div className="profile-main">
        <div className="profile-card">
          
          {/* Cover */}
          <div className="banner">
            <img src={ImageImg} alt="cover" />
          </div>

          {/* Avatar */}
          <div className="avatar">
            <img src={profilePicImg} alt="profile" />
          </div>

          {/* Info */}
          <div className="profile-info">
            <h2>Harshada Panthare</h2>
            <p className="headline">
              Web Developer | HTML | CSS | JavaScript
            </p>
            <p className="location">
              Pimpri Chinchwad, Maharashtra, India
            </p>

            {/* Buttons */}
            <div className="actions">
              <button className="primary">Open to</button>
              <button>Add profile section</button>
              <button>Enhance profile</button>
              <button className="outline">Resources</button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="info-card">
          <h3>Open to work</h3>
          <p>Web Developer roles</p>
        </div>

        <div className="info-card">
          <h3>Open to volunteer</h3>
          <p>Science and Technology</p>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="profile-sidebar">
        <div className="sidebar-card">
          <h4>Profile language</h4>
          <p>English</p>
        </div>

        <div className="sidebar-card">
          <h4>Public profile & URL</h4>
          <p>linkedin.com/in/your-profile</p>
        </div>

        <div className="sidebar-card">
          <h4>Suggested</h4>
          <p>Follow universities & companies</p>
          <button className="primary full">Follow</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;