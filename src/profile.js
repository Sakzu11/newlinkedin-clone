import { useEffect, useState } from "react";
import "./profile.css";
import profileImg from "./profilepic.png";
import { fetchProfile } from './api';
import { logout } from './userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

function ProfileModal() {
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile()
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, []);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  const name = profile
    ? `${profile.user?.first_name || ''} ${profile.user?.last_name || profile.user?.username}`.trim()
    : 'Loading...';

  return (
    <div className="profile-wrapper">
      <div className="dropdown-menu">
        <div className="profile-header">
          <img src={profile?.avatar || profileImg} alt="profile" />
          <div>
            <h4>{name}</h4>
            <p>{profile?.headline || 'Add a headline'}</p>
          </div>
        </div>

        <Link to="/main" style={{ textDecoration: 'none' }}>
          <button className="view-profile">View profile</button>
        </Link>
        <button className="verify-btn">Verify</button>

        <div className="divider" />

        <h5>Account</h5>
        <p className="premium">🔶 Try 1 month of Premium for ₹0</p>
        <p>Settings & Privacy</p>
        <p>Help</p>
        <p>Language</p>

        <div className="divider" />

        <h5>Manage</h5>
        <p>Posts & Activity</p>
        <p>Job Posting Account</p>

        <div className="divider" />

        <p className="signout" onClick={handleSignOut}>Sign Out</p>
      </div>
    </div>
  );
}

export default ProfileModal;
