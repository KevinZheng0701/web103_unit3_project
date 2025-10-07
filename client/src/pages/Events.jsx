import React, { useState, useEffect } from "react";
import EventsAPI from "../services/EventsAPI";
import Event from "../components/Event";
import "../css/Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventData = await EventsAPI.getAllEvents();
        setEvents(eventData);
      } catch (error) {
        throw error;
      }
    }
    fetchEvents();
  }, [location]);

  return (
    <div className="all-events">
      {events.length > 0 &&
        events.map((event) => {
          return <Event key={event.id} id={event.id} />;
        })}
    </div>
  );
};

export default Events;
