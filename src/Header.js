import React, { useState, useEffect, useRef } from "react";
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import linkedinImg from './linkedin.png';
import Headeroption from './Headeroption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SmsIcon from '@mui/icons-material/Sms';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AppsIcon from '@mui/icons-material/Apps';
import premiumImg from './premium.png';
import { Link } from "react-router-dom";
import ProfileModal from './profilemodal';
import profilepicImg from './profilepic.png';
import Premium from './premium';
import { fetchProfile } from './api';
import { useSelector } from 'react-redux';
import { selectuser } from './userSlice';





function Header() {
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(profilepicImg);
  const user = useSelector(selectuser);

  useEffect(() => {
    if (user) {
      fetchProfile()
        .then((res) => { if (res.data?.avatar) setAvatar(res.data.avatar); })
        .catch(() => {});
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { alert("Image too large"); return; }
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target.result);
    reader.readAsDataURL(file);
  };
  

  return (
    <div className="header">
      <div className="header__left">
        <img src={linkedinImg} alt="LinkedIn" />
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="search" />
        </div>
      </div>

      <nav className="header__right">
        <Link to="/" className="header__navlink ">
          <Headeroption Icon={HomeIcon} title="Home" />
        </Link>

        <Link to="/Mynetwork" className="header__navlink">
          <Headeroption Icon={SupervisorAccountIcon} title="My Network" />
        </Link>

        <Link to="/job" className="header__navlink">
          <Headeroption Icon={WorkIcon} title="Jobs" />
        </Link>

        <Link to="/messaging" className="header__navlink">
          <Headeroption Icon={SmsIcon} title="Messaging" />
        </Link>

        <Link to="/notification" className="header__navlink">
          <Headeroption Icon={NotificationsActiveIcon} title="Notifications" />
        </Link>

       

        {/* <Link to="/qrcode" className="header__navlink">
          <Headeroption Icon={QrCodeIcon} title="QR Code" />
        </Link> */}

        <Link to="/profile" className="header__navlink">
          <Headeroption avatar={avatar} alt="Profilepic" title="Me" small />
        </Link>

        <div className="header__navlink">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>

        <Headeroption Icon={AppsIcon} title="For Business" />
        <Link to="/premium">
          <img src={premiumImg} alt="Premium" className="header__premium" />
        </Link>
        {showModal && <Premium closeModal={() => setShowModal(false)} />}
      </nav>
      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={() => {}}
        />
      )}
    </div>
  );
}

export default Header;
