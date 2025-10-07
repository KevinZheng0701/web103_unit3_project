import React, { useState, useEffect } from "react";
import "../css/Event.css";
import EventsAPI from "../services/EventsAPI";

const Event = (props) => {
  const [event, setEvent] = useState([]);
  const [time, setTime] = useState([]);
  const [remaining, setRemaining] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const eventData = await EventsAPI.getEventById(props.id);
        setEvent(eventData[0]);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const result = formatTime(event.date);
        setTime(result);
      } catch (error) {
        throw error;
      }
    })();
  }, [event]);

  useEffect(() => {
    (async () => {
      try {
        const timeRemaining = formatRemainingTime(event.date);
        setRemaining(timeRemaining);
      } catch (error) {
        throw error;
      }
    })();
  }, [event]);

  const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatRemainingTime = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) return "Event started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const minutes = Math.floor((diff / (1000 * 60)) % (60 * 24));

    let result = "";
    if (days > 0) result += `${days}d `;
    result += `${minutes}m remaining`;

    return result;
  };

  return (
    <article className="event-information">
      <img src={event.image} />

      <div className="event-information-overlay">
        <div className="text">
          <h3>{event.name}</h3>
          <p>
            <i className="fa-regular fa-calendar fa-bounce"></i>
            <br /> {time}
          </p>
          <p id={`remaining-${event.id}`}>{remaining}</p>
        </div>
      </div>
    </article>
  );
};

export default Event;
