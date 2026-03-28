import { useEffect, useState } from "react";
import "./MyNetwork.css";
import PeopleIcon from '@mui/icons-material/People';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import api from './api';

// Extra suggested people to fill the page
const SUGGESTED = [
  { id: 's1', name: "Priya Sharma", role: "Frontend Developer at Google", mutual: 12, img: "https://i.pravatar.cc/150?img=47" },
  { id: 's2', name: "Rahul Mehta", role: "Full Stack Engineer at Amazon", mutual: 8, img: "https://i.pravatar.cc/150?img=52" },
  { id: 's3', name: "Ananya Patel", role: "UI/UX Designer at Flipkart", mutual: 5, img: "https://i.pravatar.cc/150?img=44" },
  { id: 's4', name: "Vikram Singh", role: "Data Scientist at Microsoft", mutual: 3, img: "https://i.pravatar.cc/150?img=53" },
  { id: 's5', name: "Sneha Joshi", role: "Product Manager at Swiggy", mutual: 7, img: "https://i.pravatar.cc/150?img=45" },
  { id: 's6', name: "Arjun Nair", role: "DevOps Engineer at Infosys", mutual: 2, img: "https://i.pravatar.cc/150?img=60" },
  { id: 's7', name: "Kavya Reddy", role: "ML Engineer at Wipro", mutual: 9, img: "https://i.pravatar.cc/150?img=48" },
  { id: 's8', name: "Rohan Gupta", role: "Backend Developer at TCS", mutual: 4, img: "https://i.pravatar.cc/150?img=57" },
];

const MyNetwork = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [connected, setConnected] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get('/users/')
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleConnect = (id) => {
    setConnected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Merge real users + suggested
  const allPeople = [
    ...users.map(u => ({
      id: u.id,
      name: u.first_name ? `${u.first_name} ${u.last_name || ''}`.trim() : u.username,
      role: u.email,
      mutual: Math.floor(Math.random() * 15) + 1,
      img: `https://i.pravatar.cc/150?u=${u.id}`,
    })),
    ...SUGGESTED,
  ].filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mynetwork">
      <div className="mynetwork__left">
        <h3>Manage my network</h3><hr />
        {[
          { icon: <PersonAddIcon />, label: "Connections", count: users.length, path: "/saved" },
          { icon: <PeopleIcon />, label: "Following & Followers", count: 24 },
          { icon: <Diversity1Icon />, label: "Groups", count: 3, path: "/groups" },
          { icon: <EventIcon />, label: "Events", count: 2, path: "/events" },
          { icon: <ArticleIcon />, label: "Pages", count: 5, path: "/news" },
          { icon: <NewspaperIcon />, label: "Newsletters", count: 7, path: "/news" },
        ].map(({ icon, label, count, path }) => (
          <div key={label} className="sidebarOption" onClick={() => path && navigate(path)}>
            {icon}
            <h4>{label}</h4>
            {count !== undefined && <span className="network__count">{count}</span>}
          </div>
        ))}
      </div>

      <div className="mynetwork__right">
        <div className="network__searchBar">
          <SearchIcon style={{ color: 'rgba(0,0,0,0.4)', fontSize: 20 }} />
          <input
            placeholder="Search people..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <h5>People you may know</h5>

        <div className="cardContainer">
          {allPeople.length === 0 ? (
            <p style={{ padding: '20px', color: 'rgba(0,0,0,0.5)' }}>No results found.</p>
          ) : (
            allPeople.map((u) => (
              <div key={u.id} className="card">
                <div className="card__banner" />
                <img src={u.img} alt={u.name} />
                <h4>{u.name}</h4>
                <p>{u.role}</p>
                {u.mutual > 0 && <span className="card__mutual">{u.mutual} mutual connections</span>}
                <button
                  className={connected[u.id] ? 'card__btn--connected' : ''}
                  onClick={() => handleConnect(u.id)}
                >
                  {connected[u.id] ? '✓ Connected' : '+ Connect'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNetwork;
