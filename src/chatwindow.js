import React, { useState } from "react";
import MessageInput from "./Messageinput";

function ChatWindow({ user }) {
  const [messages, setMessages] = useState([]);

  if (!user) {
    return <div className="chatWindow">Select a conversation</div>;
  }

  const sendMessage = (text) => {
    setMessages([...messages, { text, sender: "me" }]);
  };

  return (
    <div className="chatWindow">
      <h3>{user.name}</h3>

      <div className="chatMessages">
        {messages.map((msg, index) => (
          <div key={index} className="chatMessage">
            {msg.text}
          </div>
        ))}
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default ChatWindow;
