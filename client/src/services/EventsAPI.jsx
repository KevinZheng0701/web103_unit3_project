async function getAllEvents() {
  const response = await fetch("/api/events");
  const data = await response.json();
  return data;
}

async function getEventById(id) {
  const response = await fetch(`/api/events/${id}`);
  const data = await response.json();
  return data;
}

async function getEventsByLocation(location) {
  const response = await fetch(`/api/events/location/${location}`);
  const data = await response.json();
  return data;
}

export default { getAllEvents, getEventById, getEventsByLocation };
