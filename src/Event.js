import React, { useState, useEffect } from "react";
import "./Event.css";
import eventImg from "./hub.png";
import { fetchEvents, createEvent } from './api';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '' });

  useEffect(() => {
    fetchEvents()
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createEvent(form);
      setEvents([...events, res.data]);
      setShowForm(false);
      setForm({ title: '', description: '', date: '', location: '' });
    } catch (err) {
      console.error("Failed to create event", err);
    }
  };

  return (
    <div className="events-page">
      <div className="events-left">
        <div className="events-header">
          <h2>Events</h2>
          <button className="create-event-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Create event +'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} style={{ marginBottom: '16px' }}>
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px' }} />
            <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px' }} />
            <input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px' }} />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ display: 'block', width: '100%', marginBottom: '8px', padding: '8px' }} />
            <button type="submit" className="create-event-btn">Save</button>
          </form>
        )}

        <p className="event-count">{events.length} upcoming events</p>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          events.map((event) => {
            const d = new Date(event.date);
            return (
              <div key={event.id} className="event-card">
                <div className="date-badge">
                  <span className="month">{d.toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                  <span className="day">{d.getDate()}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-type">{event.location || 'Online Event'}</p>
                  <p className="event-time">{d.toLocaleString('default', { weekday: 'short' })}, {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="event-menu">•••</div>
              </div>
            );
          })
        )}
      </div>

      <div className="events-right">
        <div className="discover-card">
          <h4>Discover more events</h4>
          <img src={eventImg} alt="event" />
          <p>Find events happening near you or online.</p>
          <button className="explore-btn">Explore events</button>
        </div>
        <div className="events-footer">
          <span>About</span><span>Accessibility</span><span>Help Center</span>
          <span>Privacy & Terms</span><span>Advertising</span>
        </div>
        <p className="copyright">LinkedIn Corporation © 2026</p>
      </div>
    </div>
  );
}

export default EventsPage;
