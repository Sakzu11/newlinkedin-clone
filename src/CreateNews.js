import React, { useState } from "react";
import "./CreateNews.css";
import { FaTimes, FaPen } from "react-icons/fa";
import { createNewsletter } from './api';

const CreateNewsletterModal = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [frequency, setFrequency] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleDone = async () => {
    if (!title.trim() || !desc.trim()) {
      setError("Title and description are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await createNewsletter({ title, content: desc });
      if (onCreated) onCreated(res.data);
      onClose();
    } catch (err) {
      setError("Failed to create newsletter. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletterModal">
      <div className="newsletterBox">
        <div className="newsletterHeader">
          <h2>Create a newsletter</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <p className="topText">
          Newsletters on LinkedIn allow you to share your perspective regularly
          by publishing articles. Your subscribers will receive notifications
          after each new edition.
        </p>

        <h3>Newsletter details</h3>

        <div className="row">
          <div className="inputGroup">
            <label>Newsletter title*</label>
            <input
              type="text"
              placeholder="Add a title to your newsletter"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label>How often do you want to publish*</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option>Select one</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>

        <div className="inputGroup full">
          <label>Newsletter description*</label>
          <input
            type="text"
            placeholder="Add a description to your newsletter"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <small>This description appears alongside your newsletter title</small>
        </div>

        <div className="logo-wrapper">
          <p>Add an image or logo for your newsletter to increase engagement.</p>
          <small>The recommended image size is 300x300 pixels.</small>
          <div className="logo-box">
            {logo ? <img src={logo} alt="logo" /> : <div className="logo-placeholder"></div>}
            <label className="edit-icon">
              <FaPen />
              <input type="file" hidden onChange={handleLogoUpload} />
            </label>
          </div>
        </div>

        <div className="bottomInfo">
          <p><b>Your connections and followers will be invited to subscribe</b></p>
          <p>We'll notify your network when you publish the first edition of your newsletter.</p>
        </div>

        {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}

        <div className="footerButtons">
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
          <button className="doneBtn" onClick={handleDone} disabled={loading}>
            {loading ? "Creating..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewsletterModal;
