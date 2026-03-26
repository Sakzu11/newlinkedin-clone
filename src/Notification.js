import React,{useState}from "react";
import "./Notification.css";
import profilepicImg from './profilepic.png';
import imageImg from './image.png';

function NotificationPage() {
const [activeTab, setActiveTab] = useState("Saved");
  return (
    <div className="container">

      {/* LEFT SECTION */}
      <div className="left">

        <div className="profileCard">
          <img src={imageImg} alt="profile banner"  className="profilebanner"/>
          <img
            src={profilepicImg}
            alt="profile"
            className="profileImg"
          />
          

          <h2>Harshada Panthare</h2>
          <p>Student at ASM Group of Institutes</p>
          <p>Web development | HTML | CSS</p>
          <p>Pimpri Chinchwad</p>
        </div>

        <div className="manageCard">
          <h4>Manage your notifications</h4>
          <p className="link">View settings</p>
        </div>

      </div>


      {/* MIDDLE SECTION */}
      <div className="middle">

        <div className="tabs">
           {["All", "Jobs", "My Post", "Mentions"].map((tab) => (
          <button
            key={tab}
            className={`tabButton ${
              activeTab === tab ? "activeTab" : ""}
            `}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
         
        </div>


        {/* Notification Card 1 */}
        <div className="notificationCard">

          <img
            src="https://cdn-icons-png.flaticon.com/512/732/732212.png"
            alt="company"
          />

          <div className="content">
            <p><b>Web Developer</b> new opportunities in Pimpri Chinchwad</p>
            <button>View Jobs</button>
          </div>

          <span className="time">1h</span>

        </div>


        {/* Notification Card 2 */}
        <div className="notificationCard">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="company"
          />

          <div className="content">
            <p><b>Development Internship</b> new opportunity</p>
            <button>View Job</button>
          </div>

          <span className="time">2h</span>

        </div>


        {/* Notification Card 3 */}
        <div className="notificationCard">

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
          />

          <div className="content">
            <p><b>Omkar Jadhav</b> viewed your profile</p>
            <button>Try Premium</button>
          </div>

          <span className="time">6h</span>

        </div>
        <div className="notificationCard">

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
          />

          <div className="content">
            <p><b>Omkar Jadhav</b> viewed your profile</p>
            <button>Try Premium</button>
          </div>

          <span className="time">6h</span>

        </div>

<div className="notificationCard">

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
          />

          <div className="content">
            <p><b>Omkar Jadhav</b> viewed your profile</p>
            <button>Try Premium</button>
          </div>

          <span className="time">6h</span>

        </div>

<div className="notificationCard">

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
          />

          <div className="content">
            <p><b>Omkar Jadhav</b> viewed your profile</p>
            <button>Try Premium</button>
          </div>

          <span className="time">6h</span>

        </div>

<div className="notificationCard">

          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="profile"
          />

          <div className="content">
            <p><b>Omkar Jadhav</b> viewed your profile</p>
            <button>Try Premium</button>
          </div>

          <span className="time">6h</span>

        </div>

<div className="notificationCard">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3134/847970.png"
            alt="profile"
          />

          <div className="content">
            <p><b>Omkar Jadhav</b> viewed your profile</p>
            <button>Try Premium</button>
          </div>

          <span className="time">6h</span>

        </div>


      </div>



      {/* RIGHT SECTION */}
      <div className="right">

        <div className="premiumCard">

          <img
            src={profilepicImg}
            alt="profile"
            className="premiumImg"
          />

          <p>Boost your job search with Premium</p>

          <button>Try for free!</button>

        </div>

      </div>

    </div>
  );
}

export default NotificationPage;