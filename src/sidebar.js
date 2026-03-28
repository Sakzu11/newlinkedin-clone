import React, { useEffect, useState } from "react";
import "./sidebar.css";
import imageImg from './image.png';
import premiumImg from './premium.png';
import profilepicImg from './profilepic.png';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate, Link } from "react-router-dom";
import { fetchProfile } from './api';

function Sidebar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile()
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, []);

  const name = profile
    ? `${profile.user?.first_name || ''} ${profile.user?.last_name || profile.user?.username}`.trim()
    : 'Loading...';
  const email = profile?.user?.email || '';
  const headline = profile?.headline || '';

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar__top">
          <img src={imageImg} alt="profile banner" />
          <Link to="/main" className="header__navlink">
            <img src={profile?.avatar || profilepicImg} alt="Profile" className="sidebar__avatar" />
          </Link>
          <h2>{name}</h2>
          <h3>{email}</h3><br />
          <p>{headline || 'Web development | HTML | CSS'}<br />Pimpri Chinchwad, Maharashtra</p>
        </div>

        <div className="sidebar__stats">
          <div className="sidebar__stat">
            <a href="#"><p>Profile Viewers</p></a>
            <a href="#"><p className="sidebar__statNumber">2,543</p></a>
          </div>
          <div className="sidebar__stat">
            <a href="#"><h5>Post Impressions</h5></a>
            <a href="#"><h5 className="sidebar__statNumber1">2,448</h5></a>
          </div>
        </div>

        <div className="sidebar__bottom">
          <p>Achieve your career goals with <br />premium</p>
          <Link to="/premium"><img src={premiumImg} alt="premium" /><h3>Try Premium for free</h3></Link>
        </div>

        <div className="sidebar__end">
          <div className="sidebarOption" onClick={() => navigate("/saved")}>
            <BookmarkIcon className="sidebarIcon" /><h4>Saved Items</h4>
          </div>
          <div className="sidebarOption" onClick={() => navigate("/groups")}>
            <GroupsIcon className="sidebarIcon" /><h4>Groups</h4>
          </div>
          <div className="sidebarOption" onClick={() => navigate("/news")}>
            <ArticleIcon className="sidebarIcon" /><h4>Newsletters</h4>
          </div>
          <div className="sidebarOption" onClick={() => navigate("/events")}>
            <EventIcon className="sidebarIcon" /><h4>Events</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
