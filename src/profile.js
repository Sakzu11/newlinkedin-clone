import React from "react";
import "./profile.css";
import profileImg from "./profilepic.png";

function ProfileModal() {
 
  return (
    <div className="profile-wrapper">
      
      {/* Direct Profile Box (Always Visible) */}
      <div className="dropdown-menu">
        <div className="profile-header">
          <img src={profileImg} alt="profile" />
          <div>
            <h4>Harshada Panthare</h4>
            <p>
              Student at ASM Group of Institutes | Web development |
              HTML | CSS | Javascript
            </p>
          </div>
        </div>

        <button className="view-profile">View profile</button>
        <button className="verify-btn">Verify</button>

        <div className="divider"></div>

        <h5>Account</h5>
        <p className="premium">🔶 Try 1 month of Premium for ₹0</p>
        <p>Settings & Privacy</p>
        <p>Help</p>
        <p>Language</p>

        <div className="divider"></div>

        <h5>Manage</h5>
        <p>Posts & Activity</p>
        <p>Job Posting Account</p>

        <div className="divider"></div>

        <p className="signout">Sign Out</p>
      </div>

    </div>
  );
}

export default ProfileModal;