import React, { useState } from "react";
import "./Messaging.css";
import MessageList from "./MessageList";
import ChatWindow from "./chatwindow";

function Messaging() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="messaging">
      <MessageList onSelectUser={setSelectedUser} />
      <ChatWindow user={selectedUser} />
     <div style={{ height: "300px", background: "red" }}>
       Messaging Visible
     </div>
    </div>
  );
}

export default Messaging;

 
