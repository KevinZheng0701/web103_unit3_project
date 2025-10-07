import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import "../css/LocationEvents.css";
import EventsAPI from "../services/EventsAPI.jsx";
import LocationsAPI from "../services/LocationsAPI.jsx";

const LocationEvents = ({ index }) => {
  const [location, setLocation] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchLocation() {
      const locationData = await LocationsAPI.getLocationById(index);
      setLocation(locationData);
      const eventsData = await EventsAPI.getEventsByLocation(locationData.id);
      setEvents(eventsData);
    }

    fetchLocation();
  }, [index]);

  return (
    <div className="location-events">
      <header>
        <div className="location-info">
          <h2>{location.name}</h2>
          <p>
            {location.address}, {location.city}, {location.state} {location.zip}
          </p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event, index) => {
            return <Event key={event.id} id={event.id} />;
          })
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
