// import { Avatar } from "@mui/material";
import React ,{useState}from "react";
 import "./sidebar.css";
import imageImg from './image.png';
import premiumImg from './premium.png';
import profilepicImg from './profilepic.png';
import GroupsIcon from '@mui/icons-material/Groups'; 
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';    
import { useNavigate } from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from "react-router-dom";



function Sidebar() {
    const navigate = useNavigate();
    const handleSavedClick = () => {
    navigate("/saved");
    };
    const handleGroupsClick = () => {
    navigate("/groups");
    };
    const handleNewslettersClick = () => {
    navigate("/news");
    };
    const handleEventsClick = () => {
    navigate("/events");
    };
   

  return (
  <div className="sidebar">
    <div>
      <div className="sidebar__top">
        <img src={imageImg} alt="profile banner" />
        {/* <Link to=""><Avatar className="sidebar__avatar" src={profilepicImg} /></Link> */}
        <Link to="/main" className="header__navlink">
         <img src={profilepicImg} alt="Profile" className="sidebar__avatar" />
        </Link>
        
        <h2>Harshada Panthare</h2>
        <h3>harshadapanthare30@gmail.com</h3> <br></br>
        <p>Student at ASM Group of Institutes<br></br>Web development | HTML | CSS<br></br>
        Pimpri Chinchwad, Maharashtra<br></br></p>
        <p><b><a href="">Overload Ware Labs Ai (Owl Ai)</a> </b></p>
      </div>
     
       

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <a href=""><p>Profile Viewers</p></a>
          <a href=""><p className="sidebar__statNumber">2,543</p></a>      
        </div>
        <div className="sidebar__stat">
          <a href=""><h5>Post Impressions</h5></a>
          <a href=""><h5 className="sidebar__statNumber1">2,448</h5></a>
        </div>
      </div>
           
   
      <div className="sidebar__bottom">
        <p>Achieve your carrer goals with <br></br>premium</p>
        <Link to="./premium"><img src={premiumImg}/><h3>Try Premium for free</h3></Link>
      </div>

      <div className="sidebar__end">
         <div className="sidebarOption" onClick={handleSavedClick}>
        <BookmarkIcon className="sidebarIcon" />
        <h4>Saved Items</h4>
      </div>
       <div className="sidebarOption" onClick={handleGroupsClick}>
        <GroupsIcon className="sidebarIcon" />
        <h4>Groups</h4>
      </div>
      <div className="sidebarOption" onClick={handleNewslettersClick}>
      <ArticleIcon className="sidebarIcon" />
        <h4>Newsletters</h4>
      </div>
      <div className="sidebarOption" onClick={handleEventsClick}>
        <EventIcon className="sidebarIcon" />
        <h4>Events</h4>  
      
      </div>
      </div>

    </div>
      
  </div>

 );

};

export default Sidebar;







