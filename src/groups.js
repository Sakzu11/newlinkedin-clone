import React, { useState, useEffect } from "react";
import "./groups.css";
import hubImage from "./hub.png";
import codeImage from "./code.png";
import CreateGroup from "./create";
import { fetchGroups, joinGroup } from './api';

function GroupsPage() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Your groups");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups()
      .then((res) => setGroups(res.data))
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));
  }, []);

  const handleJoin = async (id) => {
    try {
      const res = await joinGroup(id);
      setGroups(groups.map((g) =>
        g.id === id ? { ...g, members_count: res.data.members_count } : g
      ));
    } catch (err) {
      console.error("Failed to join group", err);
    }
  };

  return (
    <div className="groups-container">
      <div className="left-section">
        <div className="tabs">
          {["Your groups", "Requested"].map((tab) => (
            <button
              key={tab}
              className={`tabButton ${activeTab === tab ? "activeTab" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <button className="tab-btn" onClick={() => setShowModal(true)}>Create Groups+</button>
        </div>

        {loading ? (
          <p style={{ padding: '20px' }}>Loading groups...</p>
        ) : groups.length === 0 ? (
          <p style={{ padding: '20px' }}>No groups yet.</p>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="group-card">
              <img src={group.image || codeImage} alt="group" className="group-img" />
              <div className="group-info">
                <h3>{group.name}</h3>
                <p>{group.members_count} members</p>
              </div>
              <div className="menu">•••</div>
            </div>
          ))
        )}

        <div className="search-text">
          <span className="blue">Search</span> other trusted communities that share and support your goals.
        </div>
      </div>

      <div className="right-section">
        <h3>Groups you might be interested in</h3>
        {groups.slice(0, 4).map((group) => (
          <div key={group.id} className="suggested-group">
            <img src={group.image || hubImage} alt="group" className="suggested-img" />
            <div className="suggested-info">
              <h4>{group.name}</h4>
              <p>{group.members_count} members</p>
              <button className="join-btn" onClick={() => handleJoin(group.id)}>Join</button>
            </div>
          </div>
        ))}

        {showModal && <CreateGroup onClose={() => setShowModal(false)} />}

        <div className="footer-links">
          <span>|About</span><span>|Accessibility</span><span>|Help Center</span>
          <span>|Privacy & Terms</span><span>|Ad Choices</span><span>|Advertising</span>
        </div>
        <p className="copyright">LinkedIn Corporation © 2026</p>
      </div>
    </div>
  );
}

export default GroupsPage;
