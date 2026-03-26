import React from "react";
import "./Notification.css";

function NotificationCard({ user, message, time }) {
  return (
    <div className="NotificationCard">
      <div className="NotificationCard__left">
        <img
          src="https://i.pravatar.cc/150?img=2"
          alt="avatar"
        />
      </div>

      <div className="NotificationCard__right">
        <p>
          <strong>{user}</strong> {message}
        </p>
        <span>{time}</span>
      </div>
    </div>
  );
}

export default NotificationCard;
