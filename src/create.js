import React, { useState } from "react";
import "./create.css";
import { FaTimes, FaPen } from "react-icons/fa";
import api from './api';

const CreateGroupModal = ({ onClose, onCreated }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

  const isDisabled = groupName.length === 0 || description.length === 0;

  const handleCreate = async () => {
    if (isDisabled) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append('name', groupName);
      formData.append('description', description);
      if (logoFile) formData.append('image', logoFile);
      const res = await api.post('/groups/', formData);
      if (onCreated) onCreated(res.data);
      onClose();
    } catch (err) {
      setError("Failed to create group. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Create Group</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="cover-banner">
          <div className="cover-design"></div>
        </div>

        <div className="logo-wrapper">
          <div className="logo-box">
            {logo ? <img src={logo} alt="logo" /> : <div className="logo-placeholder"></div>}
            <label className="edit-icon">
              <FaPen />
              <input type="file" hidden onChange={handleLogoUpload} />
            </label>
          </div>
        </div>

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

        {error && <p style={{ color: 'red', fontSize: '13px', padding: '0 16px' }}>{error}</p>}

        <div className="modal-footer">
          <button className="create-btn" disabled={isDisabled || loading} onClick={handleCreate}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
