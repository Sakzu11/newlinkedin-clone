import { useState, useEffect } from "react";
import "./Notification.css";
import profilepicImg from './profilepic.png';
import imageImg from './image.png';
import { fetchProfile } from './api';

const NOTIFICATIONS = [
  { id: 1, img: "https://cdn-icons-png.flaticon.com/512/732/732212.png", text: <><b>Web Developer</b> new opportunities in Pimpri Chinchwad</>, action: "View Jobs", time: "1h" },
  { id: 2, img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", text: <><b>Development Internship</b> new opportunity at TechCorp</>, action: "View Job", time: "2h" },
  { id: 3, img: "https://i.pravatar.cc/48?img=5", text: <><b>Omkar Jadhav</b> viewed your profile</>, action: "Try Premium", time: "6h" },
  { id: 4, img: "https://i.pravatar.cc/48?img=8", text: <><b>Priya Singh</b> liked your post</>, action: "See post", time: "8h" },
  { id: 5, img: "https://i.pravatar.cc/48?img=12", text: <><b>Rahul Sharma</b> commented on your post</>, action: "View", time: "1d" },
  { id: 6, img: "https://cdn-icons-png.flaticon.com/512/732/732212.png", text: <><b>React Developer</b> — 5 new jobs match your profile</>, action: "View Jobs", time: "1d" },
];

function NotificationPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile().then(r => setProfile(r.data)).catch(() => {});
  }, []);

  const name = profile
    ? `${profile.user?.first_name || ''} ${profile.user?.last_name || profile.user?.username}`.trim()
    : '';

  const avatar = profile?.avatar || profilepicImg;

  return (
    <div className="container">
      <div className="left">
        <div className="profileCard">
          <img src={imageImg} alt="banner" className="profilebanner" />
          <img src={avatar} alt="profile" className="profileImg" />
          <h2>{name}</h2>
          <p>{profile?.headline || 'Add a headline'}</p>
          <p>{profile?.user?.email}</p>
        </div>
        <div className="manageCard">
          <h4>Manage your notifications</h4>
          <p className="link">View settings</p>
        </div>
      </div>

      <div className="middle">
        <div className="tabs">
          {["All", "Jobs", "My Posts", "Mentions"].map(tab => (
            <button
              key={tab}
              className={`tabButton ${activeTab === tab ? "activeTab" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {NOTIFICATIONS.map(n => (
          <div key={n.id} className="notificationCard">
            <img src={n.img} alt="notification" />
            <div className="content">
              <p>{n.text}</p>
              <button>{n.action}</button>
            </div>
            <span className="time">{n.time}</span>
          </div>
        ))}
      </div>

      <div className="right">
        <div className="premiumCard">
          <img src={avatar} alt="profile" className="premiumImg" />
          <p>Boost your job search with Premium</p>
          <button>Try for free!</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
