import { useState } from "react";
import "./Messaging.css";
import MessageList from "./MessageList";
import ChatWindow from "./chatwindow";

function Messaging() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="messaging">
      <MessageList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      <ChatWindow user={selectedUser} />
    </div>
  );
}

export default Messaging;
