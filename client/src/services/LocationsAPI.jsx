async function getAllLocations() {
  const response = await fetch("/api/locations");
  const data = await response.json();
  return data;
}

async function getLocationById(id) {
  const response = await fetch(`/api/locations/${id}`);
  const data = await response.json();
  return data[0];
}

export default { getAllLocations, getLocationById };
