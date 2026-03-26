import React from "react";

const users = [
  { id: 1, name: "Rahul Sharma" },
  { id: 2, name: "Priya Singh" },
  { id: 3, name: "Amit Verma" }
];

function MessageList({ onSelectUser }) {
  return (
    <div className="messageList">
      <h3>Messaging</h3>
      {users.map((user) => (
        <div
          key={user.id}
          className="messageUser"
          onClick={() => onSelectUser(user)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
