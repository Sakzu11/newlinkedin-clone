import React from "react";
import "./Event.css";
import eventImg from "./hub.png";

function EventsPage() {
  const events = [
    {
      month: "JUL",
      day: "28",
      title: "AI & Machine Learning Virtual Summit 2026",
      type: "Online Event",
      time: "Sat, 5:00 PM",
    },
    {
      month: "AUG",
      day: "02",
      title: "Frontend Developers Meetup - React Edition",
      type: "In-person · Pune, India",
      time: "Sun, 11:00 AM",
    },
    {
      month: "AUG",
      day: "15",
      title: "Cloud & DevOps Bootcamp",
      type: "Online Event",
      time: "Fri, 7:30 PM",
    },
  ];

  return (
    <div className="events-page">

      {/* LEFT SECTION */}
      <div className="events-left">
        <div className="events-header">
          <h2>Events</h2>
          <button className="create-event-btn">Create event +</button>
        </div>

        <p className="event-count">3 upcoming events</p>

        {events.map((event, index) => (
          <div key={index} className="event-card">
            
            <div className="date-badge">
              <span className="month">{event.month}</span>
              <span className="day">{event.day}</span>
            </div>

            <div className="event-details">
              <h3>{event.title}</h3>
              <p className="event-type">{event.type}</p>
              <p className="event-time">{event.time}</p>
            </div>

            <div className="event-menu">•••</div>
          </div>
        ))}
      </div>

      {/* RIGHT SECTION */}
      <div className="events-right">
        <div className="discover-card">
          <h4>Discover more events</h4>
          <img src={eventImg} alt="event" />
          <p>Find events happening near you or online.</p>
          <button className="explore-btn">Explore events</button>
        </div>

        <div className="events-footer">
          <span>About</span>
          <span>Accessibility</span>
          <span>Help Center</span>
          <span>Privacy & Terms</span>
          <span>Advertising</span>
        </div>

        <p className="copyright">
          LinkedIn Corporation © 2026
        </p>
      </div>

    </div>
  );
}

export default EventsPage;