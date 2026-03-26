import React, { useState } from "react";
import "./create.css";
import { FaTimes, FaPen } from "react-icons/fa";

const CreateGroupModal = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const isDisabled = groupName.length === 0 || description.length === 0;

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* Header */}
        <div className="modal-header">
          <h2>Create Group</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        {/* Cover Banner */}
        <div className="cover-banner">
          <div className="cover-design"></div>
        </div>

        {/* Logo Upload */}
        <div className="logo-wrapper">
          <div className="logo-box">
            {logo ? (
              <img src={logo} alt="logo" />
            ) : (
              <div className="logo-placeholder"></div>
            )}
            <label className="edit-icon">
              <FaPen />
              <input type="file" hidden onChange={handleLogoUpload} />
            </label>
          </div>
        </div>

        {/* Form */}
        <div className="modal-body">

          <div className="form-group">
            <label>Group name*</label>
            <input
              type="text"
              maxLength="100"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <span className="counter">{groupName.length}/100</span>
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea
              maxLength="2000"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="counter">{description.length}/2000</span>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="create-btn" disabled={isDisabled}>
            Create
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateGroupModal;