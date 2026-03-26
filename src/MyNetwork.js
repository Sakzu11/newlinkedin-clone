import React from "react";
import "./MyNetwork.css";
import PeopleIcon from '@mui/icons-material/People';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from "react-router-dom";

const MyNetwork = () => {
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
    <div className="mynetwork">
      <div >
      
       {/* Left Section */}
        <div className="mynetwork__left">
       
           <h3>Manage my network</h3><br></br>
           <hr></hr>
        <div className="sidebar"></div>
        <div className="sidebarOption" onClick={handleSavedClick}>
        <PersonAddIcon className="sidebarIcon" />
        <h4>connections</h4>
         </div>
        <div className="sidebarOption" onClick={handleSavedClick}>
        <PeopleIcon className="sidebarIcon" />
        <h4>Following & Followers</h4>
        </div>
        <div className="sidebarOption" onClick={handleGroupsClick}>
        <Diversity1Icon className="sidebarIcon" />
        <h4>Groups</h4>
        </div>
        <div className="sidebarOption" onClick={handleEventsClick}>
        <EventIcon className="sidebarIcon" />
        <h4>Events</h4>
        </div>
        <div className="sidebarOption" onClick={handleNewslettersClick}>
        <ArticleIcon className="sidebarIcon" />
        <h4>Pages</h4>
        </div>
        <div className="sidebarOption" onClick={handleNewslettersClick}>
        <NewspaperIcon className="sidebarIcon" />
        <h4>Newsletters</h4>
        </div>
      </div>
      </div>
      
      {/* Right Section */}
      <div className="mynetwork__right">
        <h5>People in the IT Services and IT Consulting industry you may know</h5><br></br>

        <div className="cardContainer">
    

          <div className="card">
            <img src="https://i.pravatar.cc/150?img=1" alt="profile" />
            <h4>Rahul Sharma</h4>
            <p>Software Engineer</p>
            <button>Connect</button>
          </div>

          <div className="card">
            <img src="https://i.pravatar.cc/150?img=9" alt="profile" />
            <h4>Anita Verma</h4>
            <p>UI/UX Designer</p>
            <button>Connect</button>
          </div>

          <div className="card">
            <img src="https://i.pravatar.cc/150?img=4" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=7" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=9" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=8" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=7" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=6" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
        
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=5" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>.
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=4" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=2" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=2" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=5" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=4" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=2" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=2" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=5" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=4" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=2" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>
          <div className="card">
            <img src="https://i.pravatar.cc/150?img=2" alt="profile" />
            <h4>Akash Patel</h4>
            <p>Data Analyst</p>
            <button>Connect</button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default MyNetwork;
