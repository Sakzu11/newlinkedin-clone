import React, { useState, useRef} from "react";
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
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import QrCodeIcon from '@mui/icons-material/QrCode';
import ProfileModal from './profilemodal';
import Main from './main';
import profilepicImg from './profilepic.png';
import Premium from './premium';





function Header() {
  // const navigate = useNavigate();
  const fileInputRef = useRef(null);
   const [showModal,setShowModal]= useState(false);


  // inline SVG avatar as data URI (no external asset required)
  const defaultAvatar = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24"><rect fill="#ddd" width="24" height="24" rx="4"/><g fill="#777"><circle cx="12" cy="8" r="3"/><path d="M12 14c-4 0-6 2-6 3v1h12v-1c0-1-2-3-6-3z"/></g></svg>'
  );

  const [profilePicImg, setProfilePic] = useState(defaultAvatar);

 const handleImageChange = (event) => {
  const file = event.target.files[0];

  if (file && file.size > 2 * 1024 * 1024) {
    alert("Image too large");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => setProfilePic(e.target.result);
  reader.readAsDataURL(file);
};

  const triggerFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleSave = (data) => {
    setProfile(data);
    console.log("Saved Profile:", data);
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
          <Headeroption avatar={profilepicImg}  alt="Profilepic"title="Me" small />
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
        <Link to="./premium">
        <img src={premiumImg} alt="Premium" className="header__premium" />
        </Link>

         <div>
      {showModal && (
        <Premium closeModal={() => setShowModal(false)} />
      )}
    </div>
      </nav>
      {isModalOpen&&(
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      )}

      {profile && (
        <div>
          <h3>{profile ?.name}</h3>
          <p>{profile ?.headline}</p>
        </div> 
         )} 

         {showModal && (
        <Main onClose={() => setShowModal(false)} />
      )}                   

     
    </div>
  );
}

export default Header;
