import "./groups.css";
import hubImage from "./hub.png";
import codeImage from "./code.png";
import { useState,useRef} from "react";
import CreateGroup from "./create";

function GroupsPage() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Your groups");
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

    
  return (
    <div className="groups-container">

      {/* LEFT SECTION */}
      <div className="left-section">

        {/* Top Tabs */}
        <div className="tabs">
          {["Your groups", "Requested"].map((tab) => (
          <button
            key={tab}
            className={`tabButton ${
              activeTab === tab ? "activeTab" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
          {/* <div className=" tab"onClick={()}>Your groups</div> */}
          {activeTab === "Your groups" && (
        <div className="emptyState">
          

         </div>
          )}
          
          {/* <div className="tab ">Requested</div> */}
         {/* <button className="tab-btn" onClick={() => setShowModal(true)}>Create</button> */}
          <button className="tab-btn" onClick={() => setShowModal(true)}>Create Groups+</button>
        </div>

        {/* Group Card */}
        <div className="group-card">
          <img
            src={codeImage}
            alt="group"
            className="group-img"
          />
          <div className="group-info">
            <h3>
              Full Stack Developer Community | Tech | HR | Remote Job's |
              AI ML | Web3 Crypto
            </h3>
            <p>170,032 members</p>
          </div>
          <div className="menu" onClick={() => setOpen(!open)}>
        •••
      </div>
      {open && (
        <div className="dropdown">
          <div className="dropdown-item">Edit</div>
          <div className="dropdown-item">Delete</div>
          <div className="dropdown-item">Share</div>
        </div>
      )}
        </div>

        <div className="search-text">
          <span className="blue">Search</span> other trusted communities that
          share and support your goals.
        </div>
        <div>
        <img
            src={codeImage}
            alt="group"
            className="group-img"
          />
          <div className="group-info">
            <h3>
              Full Stack Developer Community | Tech | HR | Remote Job's |
              AI ML | Web3 Crypto
            </h3>
            <p>170,032 members</p>
          </div>
          <div className="menu">•••</div>
        <div className="search-text">
          </div>
          <span className="blue">Search</span> other trusted communities that
          share and support your goals.
        </div>
        <img
            src={codeImage}
            alt="group"
            className="group-img"
          />
          <div className="group-info">
            <h3>
              Full Stack Developer Community | Tech | HR | Remote Job's |
              AI ML | Web3 Crypto
            </h3>
            <p>170,032 members</p>
          </div>
          <div className="menu">•••</div>
        <div className="search-text">
          <span className="blue">Search</span> other trusted communities that
          share and support your goals.
        </div>
        <img
            src={codeImage}
            alt="group"
            className="group-img"
          />
          <div className="group-info">
            <h3>
              Full Stack Developer Community | Tech | HR | Remote Job's |
              AI ML | Web3 Crypto
            </h3>
            <p>170,032 members</p>
          </div>
          <div className="menu">•••</div>
        <div className="search-text">
          <span className="blue">Search</span> other trusted communities that
          share and support your goals.
        </div>
        <img
            src={codeImage}
            alt="group"
            className="group-img"
          />
          <div className="group-info">
            <h3>
              Full Stack Developer Community | Tech | HR | Remote Job's |
              AI ML | Web3 Crypto
            </h3>
            <p>170,032 members</p>
          </div>
          <div className="menu">•••</div>
        <div className="search-text">
          <span className="blue">Search</span> other trusted communities that
          share and support your goals.
        </div>
      </div>
      
      

      {/* RIGHT SECTION */}
      <div className="right-section">
        <h3>Groups you might be interested in</h3>

        {[
          { name: "OAKODE INTERNSHIP HUB", members: "162,082 members" },
          {
            name: "Internship Group – Global Early Talent Platform",
            members: "1,687,631 members",
          },
          { name: "Javascript for Web", members: "30,107 members" },
          { name: "GeeksforGeeks- Official Group", members: "699,489 members" },
        ].map((group, index) => (
          <div key={index} className="suggested-group">
            <img
              src={hubImage}
              alt="group"
              className="suggested-img"
            />
            <div className="suggested-info">
              <h4>{group.name}</h4>
              <p>{group.members}</p>
              <button className="join-btn">Join</button>
            </div>
           
          </div>
          
        ))}
    
 
      {showModal && (
        <CreateGroup onClose={() => setShowModal(false)} />
      )}
      {/* show page on groups back page also visisble */}
      <div>

       <div className="footer-links">
          <span>|About</span>
          <span>|Accessibility</span>
          <span>|Help Center</span>
          <span>|Privacy & Terms</span>
          <span>|Ad Choices</span>
          <span>|Advertising</span>
      </div>

        <p className="copyright">
          LinkedIn Corporation © 2026
        </p>
     
    </div>
      </div>
   </div>
  );
};

export default GroupsPage;



