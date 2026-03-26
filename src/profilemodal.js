import React, { useState } from "react";
import "./profilemodal.css";

function ProfileModal({ isOpen, onClose, onSave }) {
  const [profileData, setProfileData] = useState({
    name: "",
    headline: "",
    location: "",
    about: "",
    skills: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profileData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="headline" placeholder="Headline" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <textarea name="about" placeholder="About" onChange={handleChange} />
        <input name="skills" placeholder="Skills" onChange={handleChange} />

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}

export default ProfileModal;