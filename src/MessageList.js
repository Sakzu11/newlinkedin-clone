import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import api from "./api";

const BOT_USER = {
  id: 'bot',
  isBot: true,
  username: 'AI Assistant',
  first_name: 'LinkedIn AI',
  last_name: 'Assistant',
  email: 'Your career companion',
};

function MessageList({ onSelectUser, selectedUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get('/users/')
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const filtered = [BOT_USER, ...users].filter(u => {
    const name = u.first_name ? `${u.first_name} ${u.last_name || ''}` : u.username;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="messageList">
      <div className="messageList__header">
        <h3>Messaging</h3>
        <button className="messageList__edit"><EditIcon style={{ fontSize: 18 }} /></button>
      </div>

      <div className="messageList__search">
        <SearchIcon style={{ fontSize: 16, color: 'rgba(0,0,0,0.4)' }} />
        <input
          placeholder="Search messages"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.map((user) => {
        const name = user.isBot ? 'LinkedIn AI Assistant' : (user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.username);
        const sub = user.isBot ? 'Your career companion ✨' : user.email;
        const isActive = selectedUser?.id === user.id;

        return (
          <div
            key={user.id}
            className={`messageUser ${isActive ? 'messageUser--active' : ''}`}
            onClick={() => onSelectUser(user)}
          >
            {user.isBot ? (
              <div className="messageUser__botIcon">
                <SmartToyIcon style={{ fontSize: 20, color: 'white' }} />
              </div>
            ) : (
              <Avatar style={{ width: 40, height: 40, fontSize: 15, flexShrink: 0 }}>
                {user.first_name?.[0] || user.username?.[0]}
              </Avatar>
            )}
            <div className="messageUser__info">
              <span className="messageUser__name">{name}</span>
              <span className="messageUser__sub">{sub}</span>
            </div>
            {user.isBot && <span className="messageUser__badge">AI</span>}
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
